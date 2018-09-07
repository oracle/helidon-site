#!/bin/bash
#
# Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

set -o pipefail || true  # trace ERR through pipes
set -o errtrace || true # trace ERR through commands and functions
set -o errexit || true  # exit the script if any statement returns a non-true return value

on_error(){
    CODE="${?}" && \
    set +x && \
    printf "[ERROR] Error(code=%s) occurred at %s:%s command: %s\n" \
        "${CODE}" "${BASH_SOURCE}" "${LINENO}" "${BASH_COMMAND}"
}
trap on_error ERR


usage(){
  cat <<EOF

DESCRIPTION: Helidon Site Build Script

USAGE:

$(basename ${0}) [ --publish ]

  --publish
        Build and publishes the site to the 'gh-pages' branch.

  --help
        Prints the usage and exits.

EOF
}

# parse command line args
ARGS=( "${@}" )
for ((i=0;i<${#ARGS[@]};i++))
{
  ARG=${ARGS[${i}]}
  case ${ARG} in
  "--publish")
    readonly PUBLISH=true
    ;;
  "--help")
    usage
    exit 0
    ;;
  *)
    ;;
  esac
}

# Path to this script
if [ -h "${0}" ] ; then
  readonly SCRIPT_PATH="$(readlink "${0}")"
else
  readonly SCRIPT_PATH="${0}"
fi

# Path to the root of the workspace
readonly WS_DIR=$(cd $(dirname -- "${SCRIPT_PATH}") ; cd ../.. ; pwd -P)

source ${WS_DIR}/etc/scripts/wercker-env.sh

if [ "${WERCKER}" = "true" ] ; then
  # Add private_key from IDENTITY_FILE
  mkdir ~/.ssh/ 2>/dev/null || true
  echo -e "${IDENTITY_FILE}" > ~/.ssh/id_rsa
  chmod og-rwx ~/.ssh/id_rsa
  echo -e "Host *" >> ~/.ssh/config
  echo -e "\tStrictHostKeyChecking no" >> ~/.ssh/config
  echo -e "\tUserKnownHostsFile /dev/null" >> ~/.ssh/config

  # Git user info
  git config user.email || git config --global user.email "info@helidon.io"
  git config user.name || git config --global user.name "Helidon Robot"
fi

if [ "${PUBLISH}" = "true" ] ; then
    mvn -f ${WS_DIR}/pom.xml clean deploy -Ppublish,ossrh-releases
else
    mvn -f ${WS_DIR}/pom.xml clean install -Possrh-releases,ossrh-staging
fi