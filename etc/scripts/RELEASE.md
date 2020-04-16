# Releasing Helidon Website

The Helidon website content is republished with any change pushed to master.
It does NOT trigger a Maven release. Just updates the GitHub pages branch.

# Updating New Documentation

1. Do a release of the main Helidon project. Project docs are released as
   maven artifacts as part of the main Helidon release.
2. Create a pull request for the helidon-site project that has the following
   updates to the top level `pom.xml`
   1. Change `<docs.version>` to be the latest Helidon release
   2. Update the `maven-dependency-plugin` configuration to add a new
      `artifactItem` for the previous version of released docs. For
      example, if you are updating the site to publish docs for `0.10.1`
      then add an `artifactItem` section for `0.10.0`. Just copy one of
      the existing ones. This is how we make older versions of our
      documentation available.
