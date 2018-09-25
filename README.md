<p align="center">
    <img src="./etc/images/Primary_logo_blue.png" height="180">
</p>
<p align="center">
    <a href="https://github.com/oracle/helidon-site/issues">
        <img src="https://img.shields.io/github/issues/oracle/helidon-site.svg" alt="latest version">
    </a>
    <a href="https://twitter.com/intent/follow?screen_name=helidon_project">
        <img src="https://img.shields.io/twitter/follow/helidon_project.svg?style=social&logo=twitter" alt="follow on Twitter">
    </a>
</p>

# Helidon Site

This project contains the sources for the `helidon.io` website.

## Build

You will need Java 9 and Maven 3.5 or newer.

**Full build**
```bash
$ mvn install
```

**Copyright**

```bash
# Cd to the component you want to check
$ mvn validate  -Pcopyright
```