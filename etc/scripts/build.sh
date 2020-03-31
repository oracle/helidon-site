#!/bin/bash -e
#
# Copyright (c) 2018, 2020 Oracle and/or its affiliates. All rights reserved.
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

source ${WS_DIR}/etc/scripts/pipeline-env.sh

if [ -n "${JENKINS_HOME}" ] ; then
    rm -rf node_modules
fi

mask_registry(){
    if [ -n "${NPM_CONFIG_REGISTRY}" ] ; then
        sed s@"${NPM_CONFIG_REGISTRY}"@'****'@g
    else
        cat
    fi
}

if [ "${PUBLISH}" = "true" ] ; then
    if [ "${JENKINS_HOME}" ] ; then
        git config user.email || git config --global user.email "info@helidon.io"
        git config user.name || git config --global user.name "Helidon Robot"
    fi
    mvn ${MAVEN_ARGS} -f ${WS_DIR}/pom.xml clean deploy \
        -Ppublish,ossrh-staging | \
        mask_registry
else
    mvn ${MAVEN_ARGS} -f ${WS_DIR}/pom.xml clean install \
        -Possrh-staging | \
        mask_registry
fi

tar -zcvf target/site.tar.gz -C target/site .