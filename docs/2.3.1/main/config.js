function createConfig() {
    return {
        home: "about/01_overview",
        release: "2.3.1",
        releases: [
            "2.3.1"
        ],
        pathColors: {
            "*": "blue-grey"
        },
        theme: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
        },
        navTitle: 'Helidon',
        navIcon: null,
        navLogo: 'images/helidon_logo_dark.svg'
    };
}

function createRoutes(){
    return [
        {
            path: '/about/01_overview',
            meta: {
                h1: 'Overview',
                title: 'Overview',
                h1Prefix: null,
                description: 'Helidon documentation',
                keywords: 'helidon, java, microservices, microprofile, documentation',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-01_overview', '/about/01_overview', {})
        },
        {
            path: '/about/02_introduction',
            meta: {
                h1: 'About Helidon',
                title: 'About Helidon',
                h1Prefix: null,
                description: 'about Helidon',
                keywords: 'helidon, java, microservices, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-02_introduction', '/about/02_introduction', {})
        },
        {
            path: '/about/03_prerequisites',
            meta: {
                h1: 'Get Started',
                title: 'Get Started',
                h1Prefix: null,
                description: 'Helidon pre-requisites and getting started',
                keywords: 'helidon',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-03_prerequisites', '/about/03_prerequisites', {})
        },
        {
            path: '/about/04_managing-dependencies',
            meta: {
                h1: 'Managing Dependencies',
                title: 'Managing Dependencies',
                h1Prefix: null,
                description: 'Managing Maven dependencies',
                keywords: 'bom, dependency management',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-04_managing-dependencies', '/about/04_managing-dependencies', {})
        },
        {
            path: '/about/04_windows',
            meta: {
                h1: 'Helidon on Windows',
                title: 'Helidon on Windows',
                h1Prefix: null,
                description: 'Helidon on Windows',
                keywords: 'windows',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-04_windows', '/about/04_windows', {})
        },
        {
            path: '/about/05_cli',
            meta: {
                h1: 'Helidon CLI',
                title: 'Helidon CLI',
                h1Prefix: null,
                description: 'Helidon CLI',
                keywords: 'helidon cli',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-05_cli', '/about/05_cli', {})
        },
        {
            path: '/about/05_kubernetes',
            meta: {
                h1: 'Kubernetes on your Desktop',
                title: 'Kubernetes on your Desktop',
                h1Prefix: null,
                description: 'Running Kubernetes on your desktop.',
                keywords: 'kubernetes',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-05_kubernetes', '/about/05_kubernetes', {})
        },
        {
            path: '/about/10_upgrade',
            meta: {
                h1: 'Upgrading from 1.4',
                title: 'Upgrading from 1.4',
                h1Prefix: null,
                description: 'Helidon Upgrade Guide',
                keywords: 'helidon upgrade migration',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('about-10_upgrade', '/about/10_upgrade', {})
        },
        {
            path: '/se/introduction/01_introduction',
            meta: {
                h1: 'Helidon SE',
                title: 'Helidon SE',
                h1Prefix: 'SE',
                description: 'Helidon SE introduction',
                keywords: 'helidon, java, SE, microservices, Netty',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-introduction-01_introduction', '/se/introduction/01_introduction', {})
        },
        {
            path: '/se/guides/01_overview',
            meta: {
                h1: 'Overview',
                title: 'Overview',
                h1Prefix: 'SE',
                description: 'Helidon SE Guides',
                keywords: 'helidon, java, microservices, microprofile, guides',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-01_overview', '/se/guides/01_overview', {})
        },
        {
            path: '/se/guides/02_quickstart',
            meta: {
                h1: 'Helidon SE Quickstart',
                title: 'Helidon SE Quickstart',
                h1Prefix: 'SE',
                description: 'Helidon SE Quickstart Guide',
                keywords: 'helidon',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-02_quickstart', '/se/guides/02_quickstart', {})
        },
        {
            path: '/se/guides/03_config',
            meta: {
                h1: 'Helidon SE Config Guide',
                title: 'Helidon SE Config Guide',
                h1Prefix: 'SE',
                description: 'Helidon configuration',
                keywords: 'helidon, configuration, microprofile, guide, SE',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-03_config', '/se/guides/03_config', {})
        },
        {
            path: '/se/guides/04_health',
            meta: {
                h1: 'Helidon SE Health Check Guide',
                title: 'Helidon SE Health Check Guide',
                h1Prefix: 'SE',
                description: 'Helidon health-checks',
                keywords: 'helidon, health-check, health, check',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-04_health', '/se/guides/04_health', {})
        },
        {
            path: '/se/guides/05_metrics',
            meta: {
                h1: 'Helidon SE Metrics Guide',
                title: 'Helidon SE Metrics Guide',
                h1Prefix: 'SE',
                description: 'Helidon metrics',
                keywords: 'helidon, metrics, microprofile, guide',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-05_metrics', '/se/guides/05_metrics', {})
        },
        {
            path: '/se/guides/05_security_oidc',
            meta: {
                h1: 'Helidon SE OIDC Security Provider Guide',
                title: 'Helidon SE OIDC Security Provider Guide',
                h1Prefix: 'SE',
                description: 'Helidon OIDC Security Provider',
                keywords: 'helidon, security, guide, oidc, provider',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-05_security_oidc', '/se/guides/05_security_oidc', {})
        },
        {
            path: '/se/guides/06_tracing',
            meta: {
                h1: 'Helidon SE Tracing Guide',
                title: 'Helidon SE Tracing Guide',
                h1Prefix: 'SE',
                description: 'Helidon tracing',
                keywords: 'helidon, tracing, microprofile, guide',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-06_tracing', '/se/guides/06_tracing', {})
        },
        {
            path: '/se/guides/15_migration',
            meta: {
                h1: 'Helidon SE Upgrade Guide',
                title: 'Helidon SE Upgrade Guide',
                h1Prefix: 'SE',
                description: 'Helidon Upgrade Guide',
                keywords: 'helidon, porting, migration, upgrade, incompatibilities',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-15_migration', '/se/guides/15_migration', {})
        },
        {
            path: '/se/guides/25_maven_build',
            meta: {
                h1: 'Maven Guide',
                title: 'Maven Guide',
                h1Prefix: 'SE',
                description: 'Helidon Maven Guide',
                keywords: 'helidon, guide, maven, build',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-25_maven_build', '/se/guides/25_maven_build', {})
        },
        {
            path: '/se/guides/26_gradle_build',
            meta: {
                h1: 'Gradle Guide',
                title: 'Gradle Guide',
                h1Prefix: 'SE',
                description: 'Helidon Gradle Guide',
                keywords: 'helidon, guide, gradle, build',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-26_gradle_build', '/se/guides/26_gradle_build', {})
        },
        {
            path: '/se/guides/36_graalnative',
            meta: {
                h1: 'GraalVM Native Images',
                title: 'GraalVM Native Images',
                h1Prefix: 'SE',
                description: 'Helidon Native Image',
                keywords: 'helidon, guide, graalvm, native-image',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-36_graalnative', '/se/guides/36_graalnative', {})
        },
        {
            path: '/se/guides/37_jlink_image',
            meta: {
                h1: 'Custom Runtime Images with `jlink`',
                title: 'Custom Runtime Images with `jlink`',
                h1Prefix: 'SE',
                description: 'Helidon Custom Runtime Images',
                keywords: 'helidon, guide, jlink, image',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-guides-37_jlink_image', '/se/guides/37_jlink_image', {})
        },
        {
            path: '/se/config/01_introduction',
            meta: {
                h1: 'The Configuration Component',
                title: 'The Configuration Component',
                h1Prefix: 'SE',
                description: 'Helidon config introduction',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-config-01_introduction', '/se/config/01_introduction', {})
        },
        {
            path: '/se/config/02_config-sources',
            meta: {
                h1: 'Loading Configuration: Config Sources and Parsers',
                title: 'Loading Configuration: Config Sources and Parsers',
                h1Prefix: 'SE',
                description: 'A summary of Helidon config sources and parsers',
                keywords: 'Helidon, config, sources, parsers',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-config-02_config-sources', '/se/config/02_config-sources', {})
        },
        {
            path: '/se/config/03_hierarchical-features',
            meta: {
                h1: 'Hierarchical Features',
                title: 'Hierarchical Features',
                h1Prefix: 'SE',
                description: 'Helidon hierarchical features',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-config-03_hierarchical-features', '/se/config/03_hierarchical-features', {})
        },
        {
            path: '/se/config/04_property-mapping',
            meta: {
                h1: 'Property Mapping',
                title: 'Property Mapping',
                h1Prefix: 'SE',
                description: 'Helidon config property mapping',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-config-04_property-mapping', '/se/config/04_property-mapping', {})
        },
        {
            path: '/se/config/05_mutability-support',
            meta: {
                h1: 'Mutability Support',
                title: 'Mutability Support',
                h1Prefix: 'SE',
                description: 'Helidon mutability support',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-config-05_mutability-support', '/se/config/05_mutability-support', {})
        },
        {
            path: '/se/config/06_advanced-configuration',
            meta: {
                h1: 'Advanced Configuration Topics',
                title: 'Advanced Configuration Topics',
                h1Prefix: 'SE',
                description: 'Helidon config advanced configuration',
                keywords: 'helidon, config, meta',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-config-06_advanced-configuration', '/se/config/06_advanced-configuration', {})
        },
        {
            path: '/se/config/07_extensions',
            meta: {
                h1: 'Extensions',
                title: 'Extensions',
                h1Prefix: 'SE',
                description: 'Helidon config extensions',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-config-07_extensions', '/se/config/07_extensions', {})
        },
        {
            path: '/se/config/08_supported-formats',
            meta: {
                h1: 'Additional Supported Formats and Sources',
                title: 'Additional Supported Formats and Sources',
                h1Prefix: 'SE',
                description: 'Helidon config supported formats and sources',
                keywords: 'helidon, config',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-config-08_supported-formats', '/se/config/08_supported-formats', {})
        },
        {
            path: '/se/cors/01_introduction',
            meta: {
                h1: 'About CORS in Helidon SE',
                title: 'About CORS in Helidon SE',
                h1Prefix: 'SE',
                description: 'Helidon SE CORS Support',
                keywords: 'helidon, java, cors, se',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-cors-01_introduction', '/se/cors/01_introduction', {})
        },
        {
            path: '/se/cors/02_using-the-api',
            meta: {
                h1: 'Using the Helidon SE CORS API',
                title: 'Using the Helidon SE CORS API',
                h1Prefix: 'SE',
                description: 'Using the Helidon SE CORS API',
                keywords: 'helidon, java, cors, se, api',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-cors-02_using-the-api', '/se/cors/02_using-the-api', {})
        },
        {
            path: '/se/cors/03_using-configuration',
            meta: {
                h1: 'Using Configuration for CORS',
                title: 'Using Configuration for CORS',
                h1Prefix: 'SE',
                description: 'Helidon CORS Configuration',
                keywords: 'helidon, java, cors, configuration',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-cors-03_using-configuration', '/se/cors/03_using-configuration', {})
        },
        {
            path: '/se/cors/04_support-in-builtin-services',
            meta: {
                h1: 'Using CORS in Built-in Services',
                title: 'Using CORS in Built-in Services',
                h1Prefix: 'SE',
                description: 'Helidon SE CORS Support in Built-in Services',
                keywords: 'helidon, java, cors, se, services',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-cors-04_support-in-builtin-services', '/se/cors/04_support-in-builtin-services', {})
        },
        {
            path: '/se/dbclient/01_introduction',
            meta: {
                h1: 'About Helidon DB Client',
                title: 'About Helidon DB Client',
                h1Prefix: 'SE',
                description: 'Helidon DB Client',
                keywords: 'helidon, se, database, dbclient',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-dbclient-01_introduction', '/se/dbclient/01_introduction', {})
        },
        {
            path: '/se/grpc/01_introduction',
            meta: {
                h1: 'gRPC Server Introduction',
                title: 'gRPC Server Introduction',
                h1Prefix: 'SE',
                description: 'Helidon gRPC Server Introduction',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-grpc-01_introduction', '/se/grpc/01_introduction', {})
        },
        {
            path: '/se/grpc/02_configuration',
            meta: {
                h1: 'gRPC Server Configuration',
                title: 'gRPC Server Configuration',
                h1Prefix: 'SE',
                description: 'Helidon gRPC Server Configuration',
                keywords: 'helidon, grpc, java, configuration',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-grpc-02_configuration', '/se/grpc/02_configuration', {})
        },
        {
            path: '/se/grpc/03_routing',
            meta: {
                h1: 'gRPC Server Routing',
                title: 'gRPC Server Routing',
                h1Prefix: 'SE',
                description: 'Helidon gRPC Server Routing',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-grpc-03_routing', '/se/grpc/03_routing', {})
        },
        {
            path: '/se/grpc/04_service_implementation',
            meta: {
                h1: 'gRPC Service Implementation',
                title: 'gRPC Service Implementation',
                h1Prefix: 'SE',
                description: 'Helidon gRPC Service Implementation',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-grpc-04_service_implementation', '/se/grpc/04_service_implementation', {})
        },
        {
            path: '/se/grpc/05_interceptors',
            meta: {
                h1: 'gRPC Interceptors',
                title: 'gRPC Interceptors',
                h1Prefix: 'SE',
                description: 'Helidon gRPC Service Interceptors',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-grpc-05_interceptors', '/se/grpc/05_interceptors', {})
        },
        {
            path: '/se/grpc/06_health_checks',
            meta: {
                h1: 'gRPC Service Health Checks',
                title: 'gRPC Service Health Checks',
                h1Prefix: 'SE',
                description: 'Helidon gRPC Service Health Checks',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-grpc-06_health_checks', '/se/grpc/06_health_checks', {})
        },
        {
            path: '/se/grpc/07_metrics',
            meta: {
                h1: 'gRPC Service Metrics',
                title: 'gRPC Service Metrics',
                h1Prefix: 'SE',
                description: 'Helidon gRPC Service Metrics',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-grpc-07_metrics', '/se/grpc/07_metrics', {})
        },
        {
            path: '/se/grpc/08_security',
            meta: {
                h1: 'gRPC Server Security',
                title: 'gRPC Server Security',
                h1Prefix: 'SE',
                description: 'Helidon Security gRPC integration',
                keywords: 'helidon, grpc, security',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-grpc-08_security', '/se/grpc/08_security', {})
        },
        {
            path: '/se/grpc/21_client_introduction',
            meta: {
                h1: 'gRPC Client Introduction',
                title: 'gRPC Client Introduction',
                h1Prefix: 'SE',
                description: 'Helidon gRPC Client Introduction',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-grpc-21_client_introduction', '/se/grpc/21_client_introduction', {})
        },
        {
            path: '/se/grpc/22_client_configuration',
            meta: {
                h1: 'gRPC Client Configuration',
                title: 'gRPC Client Configuration',
                h1Prefix: 'SE',
                description: 'Helidon gRPC Client Configuration',
                keywords: 'helidon, grpc, java, configuration',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-grpc-22_client_configuration', '/se/grpc/22_client_configuration', {})
        },
        {
            path: '/se/grpc/23_client_implementation',
            meta: {
                h1: 'gRPC Client Implementation',
                title: 'gRPC Client Implementation',
                h1Prefix: 'SE',
                description: 'Helidon gRPC Client Implementation',
                keywords: 'helidon, grpc, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-grpc-23_client_implementation', '/se/grpc/23_client_implementation', {})
        },
        {
            path: '/se/graphql/01_introduction',
            meta: {
                h1: 'GraphQL Server Introduction',
                title: 'GraphQL Server Introduction',
                h1Prefix: 'SE',
                description: 'Helidon GraphQL Server Introduction',
                keywords: 'helidon, graphql, java',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-graphql-01_introduction', '/se/graphql/01_introduction', {})
        },
        {
            path: '/se/health/01_health',
            meta: {
                h1: 'Health Checks',
                title: 'Health Checks',
                h1Prefix: 'SE',
                description: 'Helidon health checks',
                keywords: 'helidon, health-checks, health, check',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-health-01_health', '/se/health/01_health', {})
        },
        {
            path: '/se/health/02_health_in_k8s',
            meta: {
                h1: 'Kubernetes Probes',
                title: 'Kubernetes Probes',
                h1Prefix: 'SE',
                description: 'Kubernetes probes',
                keywords: 'helidon, readiness, liveness, probes, kubernetes',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-health-02_health_in_k8s', '/se/health/02_health_in_k8s', {})
        },
        {
            path: '/se/metrics/01_metrics',
            meta: {
                h1: 'Metrics',
                title: 'Metrics',
                h1Prefix: 'SE',
                description: 'Helidon metrics',
                keywords: 'helidon, metrics',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-metrics-01_metrics', '/se/metrics/01_metrics', {})
        },
        {
            path: '/se/metrics/02_micrometer',
            meta: {
                h1: 'Micrometer Metrics',
                title: 'Micrometer Metrics',
                h1Prefix: 'SE',
                description: 'Helidon Micrometer integration',
                keywords: 'micrometer, helidon, metrics, integration',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-metrics-02_micrometer', '/se/metrics/02_micrometer', {})
        },
        {
            path: '/se/metrics/03_prometheus',
            meta: {
                h1: 'Prometheus Metrics',
                title: 'Prometheus Metrics',
                h1Prefix: 'SE',
                description: 'Helidon Prometheus metrics',
                keywords: 'helidon, metrics, prometheus',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-metrics-03_prometheus', '/se/metrics/03_prometheus', {})
        },
        {
            path: '/se/metrics/04_prometheus_exemplar_support',
            meta: {
                h1: 'Metrics Support for Exemplars',
                title: 'Metrics Support for Exemplars',
                h1Prefix: 'SE',
                description: 'Helidon metrics',
                keywords: 'helidon, metrics, exemplar, prometheus, OpenMetrics',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-metrics-04_prometheus_exemplar_support', '/se/metrics/04_prometheus_exemplar_support', {})
        },
        {
            path: '/se/openapi/01_openapi',
            meta: {
                h1: 'OpenAPI in SE',
                title: 'OpenAPI in SE',
                h1Prefix: 'SE',
                description: 'Helidon SE OpenAPI Support',
                keywords: 'helidon, se, openapi',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-openapi-01_openapi', '/se/openapi/01_openapi', {})
        },
        {
            path: '/se/oci/01_oci',
            meta: {
                h1: 'Oracle Cloud Infrastructure Integration',
                title: 'Oracle Cloud Infrastructure Integration',
                h1Prefix: 'SE',
                description: 'Helidon OCI Integration',
                keywords: 'oci',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-oci-01_oci', '/se/oci/01_oci', {})
        },
        {
            path: '/se/oci/02_object-storage',
            meta: {
                h1: 'OCI Object Storage',
                title: 'OCI Object Storage',
                h1Prefix: 'SE',
                description: 'Helidon OCI Object Storage integration',
                keywords: 'oci, objectstorage',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-oci-02_object-storage', '/se/oci/02_object-storage', {})
        },
        {
            path: '/se/oci/03_vault',
            meta: {
                h1: 'OCI Vault',
                title: 'OCI Vault',
                h1Prefix: 'SE',
                description: 'Helidon OCI Vault integration',
                keywords: 'oci, vault',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-oci-03_vault', '/se/oci/03_vault', {})
        },
        {
            path: '/se/reactivestreams/01_overview',
            meta: {
                h1: 'Overview',
                title: 'Overview',
                h1Prefix: 'SE',
                description: 'Reactive Streams support in Helidon',
                keywords: 'helidon, se, microprofile, reactivestreams',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-reactivestreams-01_overview', '/se/reactivestreams/01_overview', {})
        },
        {
            path: '/se/reactivestreams/02_engine',
            meta: {
                h1: 'Helidon Reactive Engine',
                title: 'Helidon Reactive Engine',
                h1Prefix: 'SE',
                description: 'Dependency-less reactive operators',
                keywords: 'helidon, reactive, streams, multi, single',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-reactivestreams-02_engine', '/se/reactivestreams/02_engine', {})
        },
        {
            path: '/se/reactivestreams/03_rsoperators',
            meta: {
                h1: 'Reactive Streams Operators',
                title: 'Reactive Streams Operators',
                h1Prefix: 'SE',
                description: 'MicroProfile Reactive Streams Operators support in Helidon SE',
                keywords: 'helidon, se, microprofile, reactivestreams',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-reactivestreams-03_rsoperators', '/se/reactivestreams/03_rsoperators', {})
        },
        {
            path: '/se/reactivemessaging/01_introduction',
            meta: {
                h1: 'Reactive Messaging',
                title: 'Reactive Messaging',
                h1Prefix: 'SE',
                description: 'Reactive Messaging support in Helidon SE',
                keywords: 'helidon, se, messaging',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-reactivemessaging-01_introduction', '/se/reactivemessaging/01_introduction', {})
        },
        {
            path: '/se/reactivemessaging/03_connector',
            meta: {
                h1: 'Connector',
                title: 'Connector',
                h1Prefix: 'SE',
                description: 'Reactive Messaging Connector in Helidon SE',
                keywords: 'helidon, se, messaging, connector',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-reactivemessaging-03_connector', '/se/reactivemessaging/03_connector', {})
        },
        {
            path: '/se/reactivemessaging/04_kafka',
            meta: {
                h1: 'Kafka Connector',
                title: 'Kafka Connector',
                h1Prefix: 'SE',
                description: 'Reactive Messaging support for Kafka in Helidon SE',
                keywords: 'helidon, se, messaging, kafka',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-reactivemessaging-04_kafka', '/se/reactivemessaging/04_kafka', {})
        },
        {
            path: '/se/reactivemessaging/05_jms',
            meta: {
                h1: 'JMS Connector',
                title: 'JMS Connector',
                h1Prefix: 'SE',
                description: 'Reactive Messaging support for JMS in Helidon SE',
                keywords: 'helidon, se, messaging, jms',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-reactivemessaging-05_jms', '/se/reactivemessaging/05_jms', {})
        },
        {
            path: '/se/reactivemessaging/06_aq',
            meta: {
                h1: 'AQ Connector',
                title: 'AQ Connector',
                h1Prefix: 'SE',
                description: 'Reactive Messaging support for Oracle AQ in Helidon SE',
                keywords: 'helidon, se, messaging, jms, aq',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-reactivemessaging-06_aq', '/se/reactivemessaging/06_aq', {})
        },
        {
            path: '/se/webserver/01_introduction',
            meta: {
                h1: 'WebServer Introduction',
                title: 'WebServer Introduction',
                h1Prefix: 'SE',
                description: 'Helidon Reactive WebServer Introduction',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-01_introduction', '/se/webserver/01_introduction', {})
        },
        {
            path: '/se/webserver/02_configuration',
            meta: {
                h1: 'WebServer Configuration',
                title: 'WebServer Configuration',
                h1Prefix: 'SE',
                description: 'Helidon Reactive Webserver Configuration',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-02_configuration', '/se/webserver/02_configuration', {})
        },
        {
            path: '/se/webserver/03_routing',
            meta: {
                h1: 'Routing',
                title: 'Routing',
                h1Prefix: 'SE',
                description: 'Helidon Reactive WebServer Routing',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-03_routing', '/se/webserver/03_routing', {})
        },
        {
            path: '/se/webserver/04_request-handling',
            meta: {
                h1: 'Request Handling',
                title: 'Request Handling',
                h1Prefix: 'SE',
                description: 'Helidon Reactive WebServer request handling',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-04_request-handling', '/se/webserver/04_request-handling', {})
        },
        {
            path: '/se/webserver/05_error-handling',
            meta: {
                h1: 'Error Handling',
                title: 'Error Handling',
                h1Prefix: 'SE',
                description: 'Helidon Reactive WebServer error handling',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-05_error-handling', '/se/webserver/05_error-handling', {})
        },
        {
            path: '/se/webserver/06_static-content-support',
            meta: {
                h1: 'Static Content Support',
                title: 'Static Content Support',
                h1Prefix: 'SE',
                description: 'Helidon Reactive WebServer static content support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-06_static-content-support', '/se/webserver/06_static-content-support', {})
        },
        {
            path: '/se/webserver/07_jersey-support',
            meta: {
                h1: 'Jersey (JAX-RS) Support',
                title: 'Jersey (JAX-RS) Support',
                h1Prefix: 'SE',
                description: 'Helidon Reactive WebServer Jersey JAX-RS support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-07_jersey-support', '/se/webserver/07_jersey-support', {})
        },
        {
            path: '/se/webserver/08_json-support',
            meta: {
                h1: 'JSON Support',
                title: 'JSON Support',
                h1Prefix: 'SE',
                description: 'Helidon Reactive WebServer JSON support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-08_json-support', '/se/webserver/08_json-support', {})
        },
        {
            path: '/se/webserver/09_jsonb-support',
            meta: {
                h1: 'JSON-B Support',
                title: 'JSON-B Support',
                h1Prefix: 'SE',
                description: 'Helidon Reactive WebServer JSON-B support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-09_jsonb-support', '/se/webserver/09_jsonb-support', {})
        },
        {
            path: '/se/webserver/10_jackson-support',
            meta: {
                h1: 'Jackson Support',
                title: 'Jackson Support',
                h1Prefix: 'SE',
                description: 'Helidon Reactive WebServer Jackson support',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-10_jackson-support', '/se/webserver/10_jackson-support', {})
        },
        {
            path: '/se/webserver/11_access-log',
            meta: {
                h1: 'WebServer Access Log',
                title: 'WebServer Access Log',
                h1Prefix: 'SE',
                description: 'Helidon Reactive Webserver Access Log',
                keywords: 'helidon, webserver, access log',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-11_access-log', '/se/webserver/11_access-log', {})
        },
        {
            path: '/se/webserver/12_tls-configuration',
            meta: {
                h1: 'WebServer TLS configuration',
                title: 'WebServer TLS configuration',
                h1Prefix: 'SE',
                description: 'Helidon WebServer TLS configuration',
                keywords: 'helidon, reactive, reactive streams, reactive java, reactive webserver, tls',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-12_tls-configuration', '/se/webserver/12_tls-configuration', {})
        },
        {
            path: '/se/webserver/13_http-compression',
            meta: {
                h1: 'WebServer HTTP Compression',
                title: 'WebServer HTTP Compression',
                h1Prefix: 'SE',
                description: 'Helidon WebServer HTTP Compression',
                keywords: 'helidon, http, compression, http compression, webserver, reactive webserver',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webserver-13_http-compression', '/se/webserver/13_http-compression', {})
        },
        {
            path: '/se/security/01_introduction',
            meta: {
                h1: 'Security Introduction',
                title: 'Security Introduction',
                h1Prefix: 'SE',
                description: 'Helidon Security introduction',
                keywords: 'helidon, security',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-security-01_introduction', '/se/security/01_introduction', {})
        },
        {
            path: '/se/security/02_providers',
            meta: {
                h1: 'Security Providers',
                title: 'Security Providers',
                h1Prefix: 'SE',
                description: 'Helidon Security providers',
                keywords: 'helidon, security',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-security-02_providers', '/se/security/02_providers', {})
        },
        {
            path: '/se/security/03_containers-integration',
            meta: {
                h1: 'Containers Integration',
                title: 'Containers Integration',
                h1Prefix: 'SE',
                description: 'Helidon Security containers integration',
                keywords: 'helidon, security',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-security-03_containers-integration', '/se/security/03_containers-integration', {})
        },
        {
            path: '/se/security/04_tools',
            meta: {
                h1: 'Security Tools',
                title: 'Security Tools',
                h1Prefix: 'SE',
                description: 'Helidon Security Tools',
                keywords: 'helidon, security',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-security-04_tools', '/se/security/04_tools', {})
        },
        {
            path: '/se/security/05_extensibility',
            meta: {
                h1: 'Extending Security',
                title: 'Extending Security',
                h1Prefix: 'SE',
                description: null,
                keywords: null,
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-security-05_extensibility', '/se/security/05_extensibility', {})
        },
        {
            path: '/se/scheduling/01_introduction',
            meta: {
                h1: 'Overview',
                title: 'Overview',
                h1Prefix: 'SE',
                description: 'Scheduling in Helidon SE',
                keywords: 'helidon, se, scheduling',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-scheduling-01_introduction', '/se/scheduling/01_introduction', {})
        },
        {
            path: '/se/tracing/01_tracing',
            meta: {
                h1: 'Tracing',
                title: 'Tracing',
                h1Prefix: 'SE',
                description: 'Helidon Tracing Support',
                keywords: 'helidon, tracing',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-tracing-01_tracing', '/se/tracing/01_tracing', {})
        },
        {
            path: '/se/tracing/02_zipkin',
            meta: {
                h1: 'Zipkin Tracing',
                title: 'Zipkin Tracing',
                h1Prefix: 'SE',
                description: 'Helidon Tracing Support',
                keywords: 'helidon, tracing, zipkin',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-tracing-02_zipkin', '/se/tracing/02_zipkin', {})
        },
        {
            path: '/se/tracing/03_jaeger',
            meta: {
                h1: 'Jaeger Tracing',
                title: 'Jaeger Tracing',
                h1Prefix: 'SE',
                description: 'Helidon Tracing Support',
                keywords: 'helidon, tracing, jaeger',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-tracing-03_jaeger', '/se/tracing/03_jaeger', {})
        },
        {
            path: '/se/tracing/04_jaeger_metrics',
            meta: {
                h1: 'Metrics Support for Jaeger',
                title: 'Metrics Support for Jaeger',
                h1Prefix: 'SE',
                description: 'Helidon support for Jaeger metrics',
                keywords: 'helidon, metrics, tracing, jaeger',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-tracing-04_jaeger_metrics', '/se/tracing/04_jaeger_metrics', {})
        },
        {
            path: '/se/vault/01_vault',
            meta: {
                h1: 'Vault',
                title: 'Vault',
                h1Prefix: 'SE',
                description: 'Helidon Vault integration',
                keywords: 'vault',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-vault-01_vault', '/se/vault/01_vault', {})
        },
        {
            path: '/se/webclient/01_introduction',
            meta: {
                h1: 'WebClient Introduction',
                title: 'WebClient Introduction',
                h1Prefix: 'SE',
                description: 'Helidon WebClient',
                keywords: 'helidon, se, rest, httpclient, webclient, reactive',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webclient-01_introduction', '/se/webclient/01_introduction', {})
        },
        {
            path: '/se/webclient/02_tls-configuration',
            meta: {
                h1: 'WebClient TLS configuration',
                title: 'WebClient TLS configuration',
                h1Prefix: 'SE',
                description: 'Helidon WebClient TLS configuration',
                keywords: 'helidon, se, rest, httpclient, webclient, reactive, tls',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-webclient-02_tls-configuration', '/se/webclient/02_tls-configuration', {})
        },
        {
            path: '/se/websocket/01_overview',
            meta: {
                h1: 'WebSocket Introduction',
                title: 'WebSocket Introduction',
                h1Prefix: 'SE',
                description: 'Helidon WebSocket Introduction',
                keywords: 'helidon, webserver, websocket, se',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-websocket-01_overview', '/se/websocket/01_overview', {})
        },
        {
            path: '/se/aot/01_introduction',
            meta: {
                h1: 'GraalVM native image',
                title: 'GraalVM native image',
                h1Prefix: 'SE',
                description: 'Helidon AOT using GraalVM native-image',
                keywords: 'helidon, aot, native, native-image, image, executable, se',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-aot-01_introduction', '/se/aot/01_introduction', {})
        },
        {
            path: '/se/faulttolerance/01_faulttolerance',
            meta: {
                h1: 'Fault Tolerance in Helidon SE',
                title: 'Fault Tolerance in Helidon SE',
                h1Prefix: 'SE',
                description: 'Fault Tolerance in Helidon SE',
                keywords: 'helidon, java, fault, tolerance, fault tolerance, se',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('se-faulttolerance-01_faulttolerance', '/se/faulttolerance/01_faulttolerance', {})
        },
        {
            path: '/mp/introduction/01_introduction',
            meta: {
                h1: 'Helidon MP Introduction',
                title: 'Helidon MP Introduction',
                h1Prefix: 'MP',
                description: 'about Helidon MP',
                keywords: 'helidon, java, microservices, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-introduction-01_introduction', '/mp/introduction/01_introduction', {})
        },
        {
            path: '/mp/introduction/02_microprofile',
            meta: {
                h1: 'Helidon MicroProfile',
                title: 'Helidon MicroProfile',
                h1Prefix: 'MP',
                description: 'getting started with Helidon Microprofile',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-introduction-02_microprofile', '/mp/introduction/02_microprofile', {})
        },
        {
            path: '/mp/guides/01_overview',
            meta: {
                h1: 'Overview',
                title: 'Overview',
                h1Prefix: 'MP',
                description: 'Helidon MP Guides',
                keywords: 'helidon, java, microservices, microprofile, guides',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-01_overview', '/mp/guides/01_overview', {})
        },
        {
            path: '/mp/guides/02_quickstart',
            meta: {
                h1: 'Helidon MP Quickstart',
                title: 'Helidon MP Quickstart',
                h1Prefix: 'MP',
                description: 'Helidon MP Quickstart guide',
                keywords: 'helidon',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-02_quickstart', '/mp/guides/02_quickstart', {})
        },
        {
            path: '/mp/guides/03_config',
            meta: {
                h1: 'Helidon MP Config Guide',
                title: 'Helidon MP Config Guide',
                h1Prefix: 'MP',
                description: 'Helidon configuration',
                keywords: 'helidon, configuration, microprofile, guide',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-03_config', '/mp/guides/03_config', {})
        },
        {
            path: '/mp/guides/04_health',
            meta: {
                h1: 'Helidon MP Health Check Guide',
                title: 'Helidon MP Health Check Guide',
                h1Prefix: 'MP',
                description: 'Helidon health-checks',
                keywords: 'helidon, health-checks, health, check',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-04_health', '/mp/guides/04_health', {})
        },
        {
            path: '/mp/guides/05_metrics',
            meta: {
                h1: 'Helidon MP Metrics Guide',
                title: 'Helidon MP Metrics Guide',
                h1Prefix: 'MP',
                description: 'Helidon metrics',
                keywords: 'helidon, metrics, microprofile, guide',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-05_metrics', '/mp/guides/05_metrics', {})
        },
        {
            path: '/mp/guides/05_security-oidc',
            meta: {
                h1: 'Helidon MP OIDC Security Provider',
                title: 'Helidon MP OIDC Security Provider',
                h1Prefix: 'MP',
                description: 'Helidon OIDC Security Provider guide',
                keywords: 'helidon, security, guide, oidc, provider',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-05_security-oidc', '/mp/guides/05_security-oidc', {})
        },
        {
            path: '/mp/guides/06_tracing',
            meta: {
                h1: 'Helidon MP Tracing Guide',
                title: 'Helidon MP Tracing Guide',
                h1Prefix: 'MP',
                description: 'Helidon tracing',
                keywords: 'helidon, tracing, microprofile, guide',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-06_tracing', '/mp/guides/06_tracing', {})
        },
        {
            path: '/mp/guides/07_datasource',
            meta: {
                h1: 'Helidon MP Data Source Guide',
                title: 'Helidon MP Data Source Guide',
                h1Prefix: 'MP',
                description: 'Helidon MP Data Source Guide',
                keywords: 'helidon, guide, datasource, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-07_datasource', '/mp/guides/07_datasource', {})
        },
        {
            path: '/mp/guides/08_jta',
            meta: {
                h1: 'Helidon MP JTA Guide',
                title: 'Helidon MP JTA Guide',
                h1Prefix: 'MP',
                description: 'Helidon MP JTA Guide',
                keywords: 'helidon, guide, transaction, jta, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-08_jta', '/mp/guides/08_jta', {})
        },
        {
            path: '/mp/guides/09_jpa',
            meta: {
                h1: 'Helidon MP JPA Guide',
                title: 'Helidon MP JPA Guide',
                h1Prefix: 'MP',
                description: 'Helidon MP JPA Guide',
                keywords: 'helidon, guide, transaction, jpa, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-09_jpa', '/mp/guides/09_jpa', {})
        },
        {
            path: '/mp/guides/10_mp-tutorial',
            meta: {
                h1: 'Helidon MP Tutorial',
                title: 'Helidon MP Tutorial',
                h1Prefix: 'MP',
                description: 'Helidon MP Tutorial',
                keywords: 'helidon',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-10_mp-tutorial', '/mp/guides/10_mp-tutorial', {})
        },
        {
            path: '/mp/guides/15_migration',
            meta: {
                h1: 'Helidon MP Upgrade Guide',
                title: 'Helidon MP Upgrade Guide',
                h1Prefix: 'MP',
                description: 'Helidon MP Upgrade Guide',
                keywords: 'helidon, porting, migration, upgrade, incompatibilities',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-15_migration', '/mp/guides/15_migration', {})
        },
        {
            path: '/mp/guides/25_maven_build',
            meta: {
                h1: 'Maven Guide',
                title: 'Maven Guide',
                h1Prefix: 'MP',
                description: 'Helidon Maven Guide',
                keywords: 'helidon, guide, maven, build',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-25_maven_build', '/mp/guides/25_maven_build', {})
        },
        {
            path: '/mp/guides/26_gradle_build',
            meta: {
                h1: 'Gradle Guide',
                title: 'Gradle Guide',
                h1Prefix: 'MP',
                description: 'Helidon Gradle Guide',
                keywords: 'helidon, guide, gradle, build',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-26_gradle_build', '/mp/guides/26_gradle_build', {})
        },
        {
            path: '/mp/guides/36_graalnative',
            meta: {
                h1: 'GraalVM Native Images',
                title: 'GraalVM Native Images',
                h1Prefix: 'MP',
                description: 'Helidon Native Image',
                keywords: 'helidon, guide, graalvm, native-image',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-36_graalnative', '/mp/guides/36_graalnative', {})
        },
        {
            path: '/mp/guides/37_jlink_image',
            meta: {
                h1: 'Custom Runtime Images with `jlink`',
                title: 'Custom Runtime Images with `jlink`',
                h1Prefix: 'MP',
                description: 'Helidon Custom Runtime Images',
                keywords: 'helidon, guide, jlink, image',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-37_jlink_image', '/mp/guides/37_jlink_image', {})
        },
        {
            path: '/mp/guides/38_se_services',
            meta: {
                h1: 'Reusing Helidon SE services',
                title: 'Reusing Helidon SE services',
                h1Prefix: 'MP',
                description: 'Helidon Reactive Routing',
                keywords: 'helidon, guide, routing',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-guides-38_se_services', '/mp/guides/38_se_services', {})
        },
        {
            path: '/mp/beanvalidation/01_overview',
            meta: {
                h1: 'Bean Validation Introduction',
                title: 'Bean Validation Introduction',
                h1Prefix: 'MP',
                description: 'Bean Validation Introduction',
                keywords: 'helidon, webserver, bean validation, validation',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-beanvalidation-01_overview', '/mp/beanvalidation/01_overview', {})
        },
        {
            path: '/mp/config/01_introduction',
            meta: {
                h1: 'MicroProfile Config',
                title: 'MicroProfile Config',
                h1Prefix: 'MP',
                description: 'MicroProfile Config support in Helidon MP',
                keywords: 'helidon, mp, microprofile, config, encryption, reference',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-config-01_introduction', '/mp/config/01_introduction', {})
        },
        {
            path: '/mp/config/02_MP_config_sources',
            meta: {
                h1: 'Microprofile Config Sources',
                title: 'Microprofile Config Sources',
                h1Prefix: 'MP',
                description: 'MicroProfile Config Sources',
                keywords: 'helidon, mp, ordinal, mpconfig, yamlmpconfig',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-config-02_MP_config_sources', '/mp/config/02_MP_config_sources', {})
        },
        {
            path: '/mp/extensions/01_overview',
            meta: {
                h1: 'Extensions Overview',
                title: 'Extensions Overview',
                h1Prefix: 'MP',
                description: 'Helidon extensions',
                keywords: 'helidon, java, microservices, microprofile, extensions',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-extensions-01_overview', '/mp/extensions/01_overview', {})
        },
        {
            path: '/mp/extensions/02_cdi_datasource-hikaricp',
            meta: {
                h1: 'CDI extension for HikariCP',
                title: 'CDI extension for HikariCP',
                h1Prefix: 'MP',
                description: 'Helidon CDI extension for HikariCP',
                keywords: 'helidon, java, microservices, microprofile, extensions, cdi, hikaricp',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-extensions-02_cdi_datasource-hikaricp', '/mp/extensions/02_cdi_datasource-hikaricp', {})
        },
        {
            path: '/mp/extensions/02_cdi_datasource-ucp',
            meta: {
                h1: 'CDI extension for Oracle UCP',
                title: 'CDI extension for Oracle UCP',
                h1Prefix: 'MP',
                description: 'Helidon CDI extension for Oracle Universal Connection Pool',
                keywords: 'helidon, java, microservices, microprofile, extensions, cdi, ucp',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-extensions-02_cdi_datasource-ucp', '/mp/extensions/02_cdi_datasource-ucp', {})
        },
        {
            path: '/mp/extensions/03_cdi_jedis',
            meta: {
                h1: 'CDI extension for Jedis',
                title: 'CDI extension for Jedis',
                h1Prefix: 'MP',
                description: 'Helidon CDI extension for Jedis',
                keywords: 'helidon, java, microservices, microprofile, extensions, cdi, jedis, redis',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-extensions-03_cdi_jedis', '/mp/extensions/03_cdi_jedis', {})
        },
        {
            path: '/mp/extensions/04_cdi_oci-objectstorage',
            meta: {
                h1: 'CDI extension for OCI Object storage',
                title: 'CDI extension for OCI Object storage',
                h1Prefix: 'MP',
                description: 'Helidon CDI extension for HikariCP',
                keywords: 'helidon, java, microservices, microprofile, extensions, cdi, oci, object storage',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-extensions-04_cdi_oci-objectstorage', '/mp/extensions/04_cdi_oci-objectstorage', {})
        },
        {
            path: '/mp/extensions/05_cdi_jta',
            meta: {
                h1: 'CDI extension for JTA',
                title: 'CDI extension for JTA',
                h1Prefix: 'MP',
                description: 'Helidon CDI extension for JTA',
                keywords: 'helidon, java, microservices, microprofile, extensions, cdi, jta',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-extensions-05_cdi_jta', '/mp/extensions/05_cdi_jta', {})
        },
        {
            path: '/mp/cors/01_introduction',
            meta: {
                h1: 'About CORS in Helidon MP',
                title: 'About CORS in Helidon MP',
                h1Prefix: 'MP',
                description: 'Introduction to CORS in Helidon MP',
                keywords: 'helidon, java, cors, mp, microprofile, cross-origin resource sharing',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-cors-01_introduction', '/mp/cors/01_introduction', {})
        },
        {
            path: '/mp/cors/02_using-cors',
            meta: {
                h1: 'Using the Helidon MP CORS API',
                title: 'Using the Helidon MP CORS API',
                h1Prefix: 'MP',
                description: 'Using the Helidon MP CORS API',
                keywords: 'helidon, java, cors, mp, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-cors-02_using-cors', '/mp/cors/02_using-cors', {})
        },
        {
            path: '/mp/cors/03_configuration-with-cors-mp',
            meta: {
                h1: 'Using Configuration with CORS in Helidon MP',
                title: 'Using Configuration with CORS in Helidon MP',
                h1Prefix: 'MP',
                description: 'Helidon MP CORS Configuration',
                keywords: 'helidon, java, cors, mp, microprofile, configuration',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-cors-03_configuration-with-cors-mp', '/mp/cors/03_configuration-with-cors-mp', {})
        },
        {
            path: '/mp/cors/04_support-in-builtin-services',
            meta: {
                h1: 'Using CORS in Helidon MP Built-in Services',
                title: 'Using CORS in Helidon MP Built-in Services',
                h1Prefix: 'MP',
                description: 'Helidon MP CORS Support in Built-in Services',
                keywords: 'helidon, java, cors, mp, services',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-cors-04_support-in-builtin-services', '/mp/cors/04_support-in-builtin-services', {})
        },
        {
            path: '/mp/faulttolerance/01_overview',
            meta: {
                h1: 'Fault Tolerance Introduction',
                title: 'Fault Tolerance Introduction',
                h1Prefix: 'MP',
                description: 'Fault Tolerance Introduction',
                keywords: 'helidon, webserver, faulttolerance, mp',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-faulttolerance-01_overview', '/mp/faulttolerance/01_overview', {})
        },
        {
            path: '/mp/grpc/01_mp_server_side_services',
            meta: {
                h1: 'gRPC MicroProfile Server Services',
                title: 'gRPC MicroProfile Server Services',
                h1Prefix: 'MP',
                description: 'Helidon gRPC MicroProfile Server-Side Services',
                keywords: 'helidon, grpc, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-grpc-01_mp_server_side_services', '/mp/grpc/01_mp_server_side_services', {})
        },
        {
            path: '/mp/grpc/02_mp_clients',
            meta: {
                h1: 'gRPC MicroProfile Clients',
                title: 'gRPC MicroProfile Clients',
                h1Prefix: 'MP',
                description: 'Building Helidon gRPC MicroProfile Clients',
                keywords: 'helidon, grpc, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-grpc-02_mp_clients', '/mp/grpc/02_mp_clients', {})
        },
        {
            path: '/mp/graphql/01_mp_graphql',
            meta: {
                h1: 'MicroProfile GraphQL',
                title: 'MicroProfile GraphQL',
                h1Prefix: 'MP',
                description: 'Helidon GraphQL MicroProfile',
                keywords: 'helidon, graphql, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-graphql-01_mp_graphql', '/mp/graphql/01_mp_graphql', {})
        },
        {
            path: '/mp/health/01_introduction',
            meta: {
                h1: 'MicroProfile Health',
                title: 'MicroProfile Health',
                h1Prefix: 'MP',
                description: 'MicroProfile Health support in Helidon MP',
                keywords: 'helidon, mp, microprofile, health',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-health-01_introduction', '/mp/health/01_introduction', {})
        },
        {
            path: '/mp/jaxrs/02_server-configuration',
            meta: {
                h1: 'Configuring the Server',
                title: 'Configuring the Server',
                h1Prefix: 'MP',
                description: 'Helidon MicroProfile server configuration',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-jaxrs-02_server-configuration', '/mp/jaxrs/02_server-configuration', {})
        },
        {
            path: '/mp/jaxrs/03_application-configuration',
            meta: {
                h1: 'Configuring the Application',
                title: 'Configuring the Application',
                h1Prefix: 'MP',
                description: 'Helidon MicroProfile application configuration',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-jaxrs-03_application-configuration', '/mp/jaxrs/03_application-configuration', {})
        },
        {
            path: '/mp/jaxrs/04_static-content',
            meta: {
                h1: 'Serving Static Content',
                title: 'Serving Static Content',
                h1Prefix: 'MP',
                description: 'Helidon MicroProfile static content',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-jaxrs-04_static-content', '/mp/jaxrs/04_static-content', {})
        },
        {
            path: '/mp/jaxrs/10_reactive-routing',
            meta: {
                h1: 'Reactive routing in Helidon MP',
                title: 'Reactive routing in Helidon MP',
                h1Prefix: 'MP',
                description: 'Helidon MP reactive routing',
                keywords: 'helidon, rest, reactive, WebServer, route, routing',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-jaxrs-10_reactive-routing', '/mp/jaxrs/10_reactive-routing', {})
        },
        {
            path: '/mp/jpa/01_introduction',
            meta: {
                h1: 'Helidon MP JPA',
                title: 'Helidon MP JPA',
                h1Prefix: 'MP',
                description: 'Jakarta Persistence support in Helidon MP',
                keywords: 'helidon, mp, microprofile, persistence, database',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-jpa-01_introduction', '/mp/jpa/01_introduction', {})
        },
        {
            path: '/mp/jwtauth/01_introduction',
            meta: {
                h1: 'JWT Authentication',
                title: 'JWT Authentication',
                h1Prefix: 'MP',
                description: 'MicroProfile JWT Auth support in Helidon MP',
                keywords: 'helidon, mp, microprofile, security, jwt',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-jwtauth-01_introduction', '/mp/jwtauth/01_introduction', {})
        },
        {
            path: '/mp/metrics/01_introduction',
            meta: {
                h1: 'Metrics',
                title: 'Metrics',
                h1Prefix: 'MP',
                description: 'MicroProfile Metrics support in Helidon MP',
                keywords: 'helidon, mp, microprofile, metrics',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-metrics-01_introduction', '/mp/metrics/01_introduction', {})
        },
        {
            path: '/mp/metrics/02_micrometer',
            meta: {
                h1: 'Micrometer Metrics',
                title: 'Micrometer Metrics',
                h1Prefix: 'MP',
                description: 'Helidon Micrometer integration',
                keywords: 'micrometer, helidon, metrics, integration, microprofile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-metrics-02_micrometer', '/mp/metrics/02_micrometer', {})
        },
        {
            path: '/mp/metrics/04_prometheus_exemplar_support',
            meta: {
                h1: 'Metrics Support for Exemplars',
                title: 'Metrics Support for Exemplars',
                h1Prefix: 'MP',
                description: 'Helidon metrics',
                keywords: 'helidon, metrics, exemplar, prometheus, OpenMetrics',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-metrics-04_prometheus_exemplar_support', '/mp/metrics/04_prometheus_exemplar_support', {})
        },
        {
            path: '/mp/openapi/01_openapi',
            meta: {
                h1: 'OpenAPI',
                title: 'OpenAPI',
                h1Prefix: 'MP',
                description: 'Helidon MP OpenAPI Support',
                keywords: 'helidon, mp, microprofile, openapi',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-openapi-01_openapi', '/mp/openapi/01_openapi', {})
        },
        {
            path: '/mp/oci/01_oci',
            meta: {
                h1: 'Oracle Cloud Infrastructure Integration',
                title: 'Oracle Cloud Infrastructure Integration',
                h1Prefix: 'MP',
                description: 'Helidon OCI Integration',
                keywords: 'oci',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-oci-01_oci', '/mp/oci/01_oci', {})
        },
        {
            path: '/mp/oci/02_object-storage',
            meta: {
                h1: 'OCI Object Storage',
                title: 'OCI Object Storage',
                h1Prefix: 'MP',
                description: 'Helidon OCI Object Storage integration',
                keywords: 'oci, objectstorage',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-oci-02_object-storage', '/mp/oci/02_object-storage', {})
        },
        {
            path: '/mp/oci/03_vault',
            meta: {
                h1: 'OCI Vault',
                title: 'OCI Vault',
                h1Prefix: 'MP',
                description: 'Helidon OCI Vault integration',
                keywords: 'oci, vault',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-oci-03_vault', '/mp/oci/03_vault', {})
        },
        {
            path: '/mp/reactivestreams/01_overview',
            meta: {
                h1: 'Overview',
                title: 'Overview',
                h1Prefix: 'MP',
                description: 'Reactive Streams support in Helidon',
                keywords: 'helidon, mp, microprofile, reactivestreams',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-reactivestreams-01_overview', '/mp/reactivestreams/01_overview', {})
        },
        {
            path: '/mp/reactivestreams/02_engine',
            meta: {
                h1: 'Helidon Reactive Engine',
                title: 'Helidon Reactive Engine',
                h1Prefix: 'MP',
                description: 'Dependecy-less reactive operators',
                keywords: 'helidon, reactive, streams, multi, single',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-reactivestreams-02_engine', '/mp/reactivestreams/02_engine', {})
        },
        {
            path: '/mp/reactivestreams/03_rsoperators',
            meta: {
                h1: 'Reactive Streams Operators',
                title: 'Reactive Streams Operators',
                h1Prefix: 'MP',
                description: 'MicroProfile Reactive Streams Operators support in Helidon MP',
                keywords: 'helidon, mp, microprofile, reactivestreams',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-reactivestreams-03_rsoperators', '/mp/reactivestreams/03_rsoperators', {})
        },
        {
            path: '/mp/reactivemessaging/01_introduction',
            meta: {
                h1: 'Reactive Messaging',
                title: 'Reactive Messaging',
                h1Prefix: 'MP',
                description: 'MicroProfile Reactive Messaging support in Helidon MP',
                keywords: 'helidon, mp, microprofile, messaging',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-reactivemessaging-01_introduction', '/mp/reactivemessaging/01_introduction', {})
        },
        {
            path: '/mp/reactivemessaging/02_message',
            meta: {
                h1: 'Message',
                title: 'Message',
                h1Prefix: 'MP',
                description: 'Reactive Messaging Message in Helidon MP',
                keywords: 'helidon, mp, messaging, message',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-reactivemessaging-02_message', '/mp/reactivemessaging/02_message', {})
        },
        {
            path: '/mp/reactivemessaging/03_connector',
            meta: {
                h1: 'Connector',
                title: 'Connector',
                h1Prefix: 'MP',
                description: 'Reactive Messaging Connector in Helidon MP',
                keywords: 'helidon, mp, messaging, connector',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-reactivemessaging-03_connector', '/mp/reactivemessaging/03_connector', {})
        },
        {
            path: '/mp/reactivemessaging/04_kafka',
            meta: {
                h1: 'Kafka Connector',
                title: 'Kafka Connector',
                h1Prefix: 'MP',
                description: 'Reactive Messaging support for Kafka in Helidon MP',
                keywords: 'helidon, mp, messaging, kafka',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-reactivemessaging-04_kafka', '/mp/reactivemessaging/04_kafka', {})
        },
        {
            path: '/mp/reactivemessaging/05_jms',
            meta: {
                h1: 'JMS Connector',
                title: 'JMS Connector',
                h1Prefix: 'MP',
                description: 'Reactive Messaging support for JMS in Helidon MP',
                keywords: 'helidon, mp, messaging, jms',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-reactivemessaging-05_jms', '/mp/reactivemessaging/05_jms', {})
        },
        {
            path: '/mp/reactivemessaging/06_aq',
            meta: {
                h1: 'Oracle AQ Connector',
                title: 'Oracle AQ Connector',
                h1Prefix: 'MP',
                description: 'Reactive Messaging support for Oracle AQ in Helidon MP',
                keywords: 'helidon, mp, messaging, jms, aq',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-reactivemessaging-06_aq', '/mp/reactivemessaging/06_aq', {})
        },
        {
            path: '/mp/restclient/09_rest-client',
            meta: {
                h1: 'Rest Client',
                title: 'Rest Client',
                h1Prefix: 'MP',
                description: 'Helidon MP Rest Client',
                keywords: null,
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-restclient-09_rest-client', '/mp/restclient/09_rest-client', {})
        },
        {
            path: '/mp/security/01_security',
            meta: {
                h1: 'Adding Security',
                title: 'Adding Security',
                h1Prefix: 'MP',
                description: 'Helidon MicroProfile security',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-security-01_security', '/mp/security/01_security', {})
        },
        {
            path: '/mp/security/02_providers',
            meta: {
                h1: 'Security Providers',
                title: 'Security Providers',
                h1Prefix: 'MP',
                description: 'Helidon Security providers',
                keywords: 'helidon, security',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-security-02_providers', '/mp/security/02_providers', {})
        },
        {
            path: '/mp/security/03_configuration-secrets',
            meta: {
                h1: 'Configuration Secrets',
                title: 'Configuration Secrets',
                h1Prefix: 'MP',
                description: 'Helidon MicroProfile configuration secrets',
                keywords: 'helidon, microprofile, micro-profile',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-security-03_configuration-secrets', '/mp/security/03_configuration-secrets', {})
        },
        {
            path: '/mp/scheduling/01_introduction',
            meta: {
                h1: 'Overview',
                title: 'Overview',
                h1Prefix: 'MP',
                description: 'Scheduling in Helidon MP',
                keywords: 'helidon, mp, scheduling',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-scheduling-01_introduction', '/mp/scheduling/01_introduction', {})
        },
        {
            path: '/mp/tracing/01_tracing',
            meta: {
                h1: 'Tracing',
                title: 'Tracing',
                h1Prefix: 'MP',
                description: 'Helidon MP Tracing Support',
                keywords: null,
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-tracing-01_tracing', '/mp/tracing/01_tracing', {})
        },
        {
            path: '/mp/tracing/02_zipkin',
            meta: {
                h1: 'Zipkin Tracing',
                title: 'Zipkin Tracing',
                h1Prefix: 'MP',
                description: 'Helidon Tracing Support',
                keywords: 'helidon, tracing, zipkin',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-tracing-02_zipkin', '/mp/tracing/02_zipkin', {})
        },
        {
            path: '/mp/tracing/03_jaeger',
            meta: {
                h1: 'Jaeger Tracing',
                title: 'Jaeger Tracing',
                h1Prefix: 'MP',
                description: 'Helidon Tracing Support',
                keywords: 'helidon, tracing, jaeger',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-tracing-03_jaeger', '/mp/tracing/03_jaeger', {})
        },
        {
            path: '/mp/tracing/04_jaeger_metrics',
            meta: {
                h1: 'Metrics Support for Jaeger',
                title: 'Metrics Support for Jaeger',
                h1Prefix: 'MP',
                description: 'Helidon support for Jaeger metrics',
                keywords: 'helidon, metrics, tracing, jaeger',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-tracing-04_jaeger_metrics', '/mp/tracing/04_jaeger_metrics', {})
        },
        {
            path: '/mp/vault/01_vault',
            meta: {
                h1: 'Vault',
                title: 'Vault',
                h1Prefix: 'MP',
                description: 'Helidon Vault integration',
                keywords: 'vault',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-vault-01_vault', '/mp/vault/01_vault', {})
        },
        {
            path: '/mp/websocket/01_overview',
            meta: {
                h1: 'WebSocket Introduction',
                title: 'WebSocket Introduction',
                h1Prefix: 'MP',
                description: 'Helidon WebSocket Introduction',
                keywords: 'helidon, webserver, websocket, mp',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-websocket-01_overview', '/mp/websocket/01_overview', {})
        },
        {
            path: '/mp/aot/01_introduction',
            meta: {
                h1: 'GraalVM native image',
                title: 'GraalVM native image',
                h1Prefix: 'MP',
                description: 'Helidon AOT using GraalVM native-image',
                keywords: 'helidon, aot, native, native-image, image, executable, mp',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-aot-01_introduction', '/mp/aot/01_introduction', {})
        },
        {
            path: '/mp/testing/01_testing',
            meta: {
                h1: 'Testing with JUnit5',
                title: 'Testing with JUnit5',
                h1Prefix: 'MP',
                description: 'Helidon Testing',
                keywords: 'helidon, mp, test, testing',
                customLayout: null,
                hasNav: true
            },
            component: loadPage('mp-testing-01_testing', '/mp/testing/01_testing', {})
        },
        {
            path: '/guides/34_Oracle_Kubernetes',
            meta: {
                h1: 'Deploying to OKE',
                title: 'Deploying to OKE',
                h1Prefix: null,
                description: 'Helidon Oracle Container Engine for Kubernetes (OKE) Guide',
                keywords: 'helidon, guide, oracle, kubernetes',
                customLayout: null,
                hasNav: false
            },
            component: loadPage('guides-34_Oracle_Kubernetes', '/guides/34_Oracle_Kubernetes', {})
        },
        {
            path: '/guides/32_jib',
            meta: {
                h1: 'Build Container Images with Jib',
                title: 'Build Container Images with Jib',
                h1Prefix: null,
                description: 'Helidon Jib Guide',
                keywords: 'helidon, guide, docker, jib',
                customLayout: null,
                hasNav: false
            },
            component: loadPage('guides-32_jib', '/guides/32_jib', {})
        },
        {
            path: '/community/01_community',
            meta: {
                h1: 'Community',
                title: 'Community',
                h1Prefix: null,
                description: 'Helidon community',
                keywords: 'helidon, community, slack, github, twitter, blog',
                customLayout: null,
                hasNav: false
            },
            component: loadPage('community-01_community', '/community/01_community', {})
        },
        {
            path: '/mp/cors/hide_why-options',
            meta: {
                h1: 'Why `@OPTIONS`?',
                title: 'Why `@OPTIONS`?',
                h1Prefix: 'MP',
                description: 'Exploration of why Helidon MP associates the `@CrossOrigin` annotation with `@OPTIONS` methods.',
                keywords: 'helidon, java, cors, mp, microprofile, jax-rs cross-origin resource sharing',
                customLayout: null,
                hasNav: false
            },
            component: loadPage('mp-cors-hide_why-options', '/mp/cors/hide_why-options', {})
        },
        {
            path: '/', redirect: '/about/01_overview'
        },
        {
            path: '*', redirect: '/'
        }
    ];
}

function createNav(){
    return [
        {
            groups: [
                {
                    title: 'Introduction',
                    group: '/about',
                    items: [
                        {
                            title: 'About',
                            action: 'assistant',
                            group: '/about',
                            items: [
                                { href: '/about/01_overview', title: 'Overview' },
                                { href: '/about/02_introduction', title: 'About Helidon' },
                                { href: '/about/03_prerequisites', title: 'Get Started' },
                                { href: '/about/04_managing-dependencies', title: 'Managing Dependencies' },
                                { href: '/about/04_windows', title: 'Helidon on Windows' },
                                { href: '/about/05_cli', title: 'Helidon CLI' },
                                { href: '/about/05_kubernetes', title: 'Kubernetes on your Desktop' },
                                { href: '/about/10_upgrade', title: 'Upgrading from 1.4' }
                            ]
                        }
                    ]
                },
                {
                    title: 'Helidon SE',
                    group: '/se',
                    items: [
                        {
                            title: 'Introduction',
                            action: 'widgets',
                            group: '/se/introduction',
                            items: [
                                { href: '/se/introduction/01_introduction', title: 'Helidon SE' }
                            ]
                        },
                        {
                            title: 'Guides',
                            action: 'explore',
                            group: '/se/guides',
                            items: [
                                { href: '/se/guides/01_overview', title: 'Overview' },
                                { href: '/se/guides/02_quickstart', title: 'Helidon SE Quickstart' },
                                { href: '/se/guides/03_config', title: 'Helidon SE Config Guide' },
                                { href: '/se/guides/04_health', title: 'Helidon SE Health Check Guide' },
                                { href: '/se/guides/05_metrics', title: 'Helidon SE Metrics Guide' },
                                { href: '/se/guides/05_security_oidc', title: 'Helidon SE OIDC Security Provider Guide' },
                                { href: '/se/guides/06_tracing', title: 'Helidon SE Tracing Guide' },
                                { href: '/se/guides/15_migration', title: 'Helidon SE Upgrade Guide' },
                                { href: '/se/guides/25_maven_build', title: 'Maven Guide' },
                                { href: '/se/guides/26_gradle_build', title: 'Gradle Guide' },
                                { href: '/se/guides/36_graalnative', title: 'GraalVM Native Images' },
                                { href: '/se/guides/37_jlink_image', title: 'Custom Runtime Images with `jlink`' }
                            ]
                        },
                        {
                            title: 'Config',
                            action: 'settings',
                            group: '/se/config',
                            items: [
                                { href: '/se/config/01_introduction', title: 'The Configuration Component' },
                                { href: '/se/config/02_config-sources', title: 'Loading Configuration: Config Sources and Parsers' },
                                { href: '/se/config/03_hierarchical-features', title: 'Hierarchical Features' },
                                { href: '/se/config/04_property-mapping', title: 'Property Mapping' },
                                { href: '/se/config/05_mutability-support', title: 'Mutability Support' },
                                { href: '/se/config/06_advanced-configuration', title: 'Advanced Configuration Topics' },
                                { href: '/se/config/07_extensions', title: 'Extensions' },
                                { href: '/se/config/08_supported-formats', title: 'Additional Supported Formats and Sources' }
                            ]
                        },
                        {
                            title: 'CORS',
                            action: 'share',
                            group: '/se/cors',
                            items: [
                                { href: '/se/cors/01_introduction', title: 'About CORS in Helidon SE' },
                                { href: '/se/cors/02_using-the-api', title: 'Using the Helidon SE CORS API' },
                                { href: '/se/cors/03_using-configuration', title: 'Using Configuration for CORS' },
                                { href: '/se/cors/04_support-in-builtin-services', title: 'Using CORS in Built-in Services' }
                            ]
                        },
                        {
                            title: 'DB Client',
                            action: 'storage',
                            group: '/se/dbclient',
                            items: [
                                { href: '/se/dbclient/01_introduction', title: 'About Helidon DB Client' }
                            ]
                        },
                        {
                            title: 'gRPC server',
                            action: 'swap_horiz',
                            group: '/se/grpc',
                            items: [
                                { href: '/se/grpc/01_introduction', title: 'gRPC Server Introduction' },
                                { href: '/se/grpc/02_configuration', title: 'gRPC Server Configuration' },
                                { href: '/se/grpc/03_routing', title: 'gRPC Server Routing' },
                                { href: '/se/grpc/04_service_implementation', title: 'gRPC Service Implementation' },
                                { href: '/se/grpc/05_interceptors', title: 'gRPC Interceptors' },
                                { href: '/se/grpc/06_health_checks', title: 'gRPC Service Health Checks' },
                                { href: '/se/grpc/07_metrics', title: 'gRPC Service Metrics' },
                                { href: '/se/grpc/08_security', title: 'gRPC Server Security' },
                                { href: '/se/grpc/21_client_introduction', title: 'gRPC Client Introduction' },
                                { href: '/se/grpc/22_client_configuration', title: 'gRPC Client Configuration' },
                                { href: '/se/grpc/23_client_implementation', title: 'gRPC Client Implementation' }
                            ]
                        },
                        {
                            title: 'GraphQL server',
                            action: 'graphic_eq',
                            group: '/se/graphql',
                            items: [
                                { href: '/se/graphql/01_introduction', title: 'GraphQL Server Introduction' }
                            ]
                        },
                        {
                            title: 'Health Checks',
                            action: 'favorite_outline',
                            group: '/se/health',
                            items: [
                                { href: '/se/health/01_health', title: 'Health Checks' },
                                { href: '/se/health/02_health_in_k8s', title: 'Kubernetes Probes' }
                            ]
                        },
                        {
                            title: 'Metrics',
                            action: 'av_timer',
                            group: '/se/metrics',
                            items: [
                                { href: '/se/metrics/01_metrics', title: 'Metrics' },
                                { href: '/se/metrics/02_micrometer', title: 'Micrometer Metrics' },
                                { href: '/se/metrics/03_prometheus', title: 'Prometheus Metrics' },
                                { href: '/se/metrics/04_prometheus_exemplar_support', title: 'Metrics Support for Exemplars' }
                            ]
                        },
                        {
                            title: 'OpenAPI',
                            action: 'donut_large',
                            group: '/se/openapi',
                            items: [
                                { href: '/se/openapi/01_openapi', title: 'OpenAPI in SE' }
                            ]
                        },
                        {
                            title: 'OCI',
                            action: 'filter_drama',
                            group: '/se/oci',
                            items: [
                                { href: '/se/oci/01_oci', title: 'Oracle Cloud Infrastructure Integration' },
                                { href: '/se/oci/02_object-storage', title: 'OCI Object Storage' },
                                { href: '/se/oci/03_vault', title: 'OCI Vault' }
                            ]
                        },
                        {
                            title: 'Reactive Streams',
                            action: 'waves',
                            group: '/se/reactivestreams',
                            items: [
                                { href: '/se/reactivestreams/01_overview', title: 'Overview' },
                                { href: '/se/reactivestreams/02_engine', title: 'Helidon Reactive Engine' },
                                { href: '/se/reactivestreams/03_rsoperators', title: 'Reactive Streams Operators' }
                            ]
                        },
                        {
                            title: 'Reactive Messaging',
                            action: 'message',
                            group: '/se/reactivemessaging',
                            items: [
                                { href: '/se/reactivemessaging/01_introduction', title: 'Reactive Messaging' },
                                { href: '/se/reactivemessaging/03_connector', title: 'Connector' },
                                { href: '/se/reactivemessaging/04_kafka', title: 'Kafka Connector' },
                                { href: '/se/reactivemessaging/05_jms', title: 'JMS Connector' },
                                { href: '/se/reactivemessaging/06_aq', title: 'AQ Connector' }
                            ]
                        },
                        {
                            title: 'Reactive Webserver',
                            action: 'settings_ethernet',
                            group: '/se/webserver',
                            items: [
                                { href: '/se/webserver/01_introduction', title: 'WebServer Introduction' },
                                { href: '/se/webserver/02_configuration', title: 'WebServer Configuration' },
                                { href: '/se/webserver/03_routing', title: 'Routing' },
                                { href: '/se/webserver/04_request-handling', title: 'Request Handling' },
                                { href: '/se/webserver/05_error-handling', title: 'Error Handling' },
                                { href: '/se/webserver/06_static-content-support', title: 'Static Content Support' },
                                { href: '/se/webserver/07_jersey-support', title: 'Jersey (JAX-RS) Support' },
                                { href: '/se/webserver/08_json-support', title: 'JSON Support' },
                                { href: '/se/webserver/09_jsonb-support', title: 'JSON-B Support' },
                                { href: '/se/webserver/10_jackson-support', title: 'Jackson Support' },
                                { href: '/se/webserver/11_access-log', title: 'WebServer Access Log' },
                                { href: '/se/webserver/12_tls-configuration', title: 'WebServer TLS configuration' },
                                { href: '/se/webserver/13_http-compression', title: 'WebServer HTTP Compression' }
                            ]
                        },
                        {
                            title: 'Security',
                            action: 'security',
                            group: '/se/security',
                            items: [
                                { href: '/se/security/01_introduction', title: 'Security Introduction' },
                                { href: '/se/security/02_providers', title: 'Security Providers' },
                                { href: '/se/security/03_containers-integration', title: 'Containers Integration' },
                                { href: '/se/security/04_tools', title: 'Security Tools' },
                                { href: '/se/security/05_extensibility', title: 'Extending Security' }
                            ]
                        },
                        {
                            title: 'Scheduling',
                            action: 'access_alarm',
                            group: '/se/scheduling',
                            items: [
                                { href: '/se/scheduling/01_introduction', title: 'Overview' }
                            ]
                        },
                        {
                            title: 'Tracing',
                            action: 'timeline',
                            group: '/se/tracing',
                            items: [
                                { href: '/se/tracing/01_tracing', title: 'Tracing' },
                                { href: '/se/tracing/02_zipkin', title: 'Zipkin Tracing' },
                                { href: '/se/tracing/03_jaeger', title: 'Jaeger Tracing' },
                                { href: '/se/tracing/04_jaeger_metrics', title: 'Metrics Support for Jaeger' }
                            ]
                        },
                        {
                            title: 'Vault',
                            action: 'lock',
                            group: '/se/vault',
                            items: [
                                { href: '/se/vault/01_vault', title: 'Vault' }
                            ]
                        },
                        {
                            title: 'Web Client',
                            action: 'http',
                            group: '/se/webclient',
                            items: [
                                { href: '/se/webclient/01_introduction', title: 'WebClient Introduction' },
                                { href: '/se/webclient/02_tls-configuration', title: 'WebClient TLS configuration' }
                            ]
                        },
                        {
                            title: 'Websocket',
                            action: 'timeline',
                            group: '/se/websocket',
                            items: [
                                { href: '/se/websocket/01_overview', title: 'WebSocket Introduction' }
                            ]
                        },
                        {
                            title: 'AOT',
                            action: 'save',
                            group: '/se/aot',
                            items: [
                                { href: '/se/aot/01_introduction', title: 'GraalVM native image' }
                            ]
                        },
                        {
                            title: 'Fault Tolerance',
                            action: 'warning',
                            group: '/se/faulttolerance',
                            items: [
                                { href: '/se/faulttolerance/01_faulttolerance', title: 'Fault Tolerance in Helidon SE' }
                            ]
                        }
                    ]
                },
                {
                    title: 'Helidon MP',
                    group: '/mp',
                    items: [
                        {
                            title: 'Introduction',
                            action: 'widgets',
                            group: '/mp/introduction',
                            items: [
                                { href: '/mp/introduction/01_introduction', title: 'Helidon MP Introduction' },
                                { href: '/mp/introduction/02_microprofile', title: 'Helidon MicroProfile' }
                            ]
                        },
                        {
                            title: 'Guides',
                            action: 'explore',
                            group: '/mp/guides',
                            items: [
                                { href: '/mp/guides/01_overview', title: 'Overview' },
                                { href: '/mp/guides/02_quickstart', title: 'Helidon MP Quickstart' },
                                { href: '/mp/guides/03_config', title: 'Helidon MP Config Guide' },
                                { href: '/mp/guides/04_health', title: 'Helidon MP Health Check Guide' },
                                { href: '/mp/guides/05_metrics', title: 'Helidon MP Metrics Guide' },
                                { href: '/mp/guides/05_security-oidc', title: 'Helidon MP OIDC Security Provider' },
                                { href: '/mp/guides/06_tracing', title: 'Helidon MP Tracing Guide' },
                                { href: '/mp/guides/07_datasource', title: 'Helidon MP Data Source Guide' },
                                { href: '/mp/guides/08_jta', title: 'Helidon MP JTA Guide' },
                                { href: '/mp/guides/09_jpa', title: 'Helidon MP JPA Guide' },
                                { href: '/mp/guides/10_mp-tutorial', title: 'Helidon MP Tutorial' },
                                { href: '/mp/guides/15_migration', title: 'Helidon MP Upgrade Guide' },
                                { href: '/mp/guides/25_maven_build', title: 'Maven Guide' },
                                { href: '/mp/guides/26_gradle_build', title: 'Gradle Guide' },
                                { href: '/mp/guides/36_graalnative', title: 'GraalVM Native Images' },
                                { href: '/mp/guides/37_jlink_image', title: 'Custom Runtime Images with `jlink`' },
                                { href: '/mp/guides/38_se_services', title: 'Reusing Helidon SE services' }
                            ]
                        },
                        {
                            title: 'Bean Validation',
                            action: 'receipt',
                            group: '/mp/beanvalidation',
                            items: [
                                { href: '/mp/beanvalidation/01_overview', title: 'Bean Validation Introduction' }
                            ]
                        },
                        {
                            title: 'Config',
                            action: 'settings',
                            group: '/mp/config',
                            items: [
                                { href: '/mp/config/01_introduction', title: 'MicroProfile Config' },
                                { href: '/mp/config/02_MP_config_sources', title: 'Microprofile Config Sources' }
                            ]
                        },
                        {
                            title: 'CDI Extensions',
                            action: 'extension',
                            group: '/mp/extensions',
                            items: [
                                { href: '/mp/extensions/01_overview', title: 'Extensions Overview' },
                                { href: '/mp/extensions/02_cdi_datasource-hikaricp', title: 'CDI extension for HikariCP' },
                                { href: '/mp/extensions/02_cdi_datasource-ucp', title: 'CDI extension for Oracle UCP' },
                                { href: '/mp/extensions/03_cdi_jedis', title: 'CDI extension for Jedis' },
                                { href: '/mp/extensions/04_cdi_oci-objectstorage', title: 'CDI extension for OCI Object storage' },
                                { href: '/mp/extensions/05_cdi_jta', title: 'CDI extension for JTA' }
                            ]
                        },
                        {
                            title: 'CORS',
                            action: 'share',
                            group: '/mp/cors',
                            items: [
                                { href: '/mp/cors/01_introduction', title: 'About CORS in Helidon MP' },
                                { href: '/mp/cors/02_using-cors', title: 'Using the Helidon MP CORS API' },
                                { href: '/mp/cors/03_configuration-with-cors-mp', title: 'Using Configuration with CORS in Helidon MP' },
                                { href: '/mp/cors/04_support-in-builtin-services', title: 'Using CORS in Helidon MP Built-in Services' }
                            ]
                        },
                        {
                            title: 'Fault Tolerance',
                            action: 'warning',
                            group: '/mp/faulttolerance',
                            items: [
                                { href: '/mp/faulttolerance/01_overview', title: 'Fault Tolerance Introduction' }
                            ]
                        },
                        {
                            title: 'gRPC server',
                            action: 'swap_horiz',
                            group: '/mp/grpc',
                            items: [
                                { href: '/mp/grpc/01_mp_server_side_services', title: 'gRPC MicroProfile Server Services' },
                                { href: '/mp/grpc/02_mp_clients', title: 'gRPC MicroProfile Clients' }
                            ]
                        },
                        {
                            title: 'GraphQL',
                            action: 'graphic_eq',
                            group: '/mp/graphql',
                            items: [
                                { href: '/mp/graphql/01_mp_graphql', title: 'MicroProfile GraphQL' }
                            ]
                        },
                        {
                            title: 'Health Checks',
                            action: 'favorite_outline',
                            group: '/mp/health',
                            items: [
                                { href: '/mp/health/01_introduction', title: 'MicroProfile Health' }
                            ]
                        },
                        {
                            title: 'JAX-RS/Jersey',
                            action: 'settings_ethernet',
                            group: '/mp/jaxrs',
                            items: [
                                { href: '/mp/jaxrs/02_server-configuration', title: 'Configuring the Server' },
                                { href: '/mp/jaxrs/03_application-configuration', title: 'Configuring the Application' },
                                { href: '/mp/jaxrs/04_static-content', title: 'Serving Static Content' },
                                { href: '/mp/jaxrs/10_reactive-routing', title: 'Reactive routing in Helidon MP' }
                            ]
                        },
                        {
                            title: 'JPA',
                            action: 'dns',
                            group: '/mp/jpa',
                            items: [
                                { href: '/mp/jpa/01_introduction', title: 'Helidon MP JPA' }
                            ]
                        },
                        {
                            title: 'JWT Auth',
                            action: 'verified_user',
                            group: '/mp/jwtauth',
                            items: [
                                { href: '/mp/jwtauth/01_introduction', title: 'JWT Authentication' }
                            ]
                        },
                        {
                            title: 'Metrics',
                            action: 'av_timer',
                            group: '/mp/metrics',
                            items: [
                                { href: '/mp/metrics/01_introduction', title: 'Metrics' },
                                { href: '/mp/metrics/02_micrometer', title: 'Micrometer Metrics' },
                                { href: '/mp/metrics/04_prometheus_exemplar_support', title: 'Metrics Support for Exemplars' }
                            ]
                        },
                        {
                            title: 'OpenAPI',
                            action: 'donut_large',
                            group: '/mp/openapi',
                            items: [
                                { href: '/mp/openapi/01_openapi', title: 'OpenAPI' }
                            ]
                        },
                        {
                            title: 'OCI',
                            action: 'filter_drama',
                            group: '/mp/oci',
                            items: [
                                { href: '/mp/oci/01_oci', title: 'Oracle Cloud Infrastructure Integration' },
                                { href: '/mp/oci/02_object-storage', title: 'OCI Object Storage' },
                                { href: '/mp/oci/03_vault', title: 'OCI Vault' }
                            ]
                        },
                        {
                            title: 'Reactive Streams',
                            action: 'waves',
                            group: '/mp/reactivestreams',
                            items: [
                                { href: '/mp/reactivestreams/01_overview', title: 'Overview' },
                                { href: '/mp/reactivestreams/02_engine', title: 'Helidon Reactive Engine' },
                                { href: '/mp/reactivestreams/03_rsoperators', title: 'Reactive Streams Operators' }
                            ]
                        },
                        {
                            title: 'Reactive Messaging',
                            action: 'message',
                            group: '/mp/reactivemessaging',
                            items: [
                                { href: '/mp/reactivemessaging/01_introduction', title: 'Reactive Messaging' },
                                { href: '/mp/reactivemessaging/02_message', title: 'Message' },
                                { href: '/mp/reactivemessaging/03_connector', title: 'Connector' },
                                { href: '/mp/reactivemessaging/04_kafka', title: 'Kafka Connector' },
                                { href: '/mp/reactivemessaging/05_jms', title: 'JMS Connector' },
                                { href: '/mp/reactivemessaging/06_aq', title: 'Oracle AQ Connector' }
                            ]
                        },
                        {
                            title: 'REST Client',
                            action: 'airplay',
                            group: '/mp/restclient',
                            items: [
                                { href: '/mp/restclient/09_rest-client', title: 'Rest Client' }
                            ]
                        },
                        {
                            title: 'Security',
                            action: 'security',
                            group: '/mp/security',
                            items: [
                                { href: '/mp/security/01_security', title: 'Adding Security' },
                                { href: '/mp/security/02_providers', title: 'Security Providers' },
                                { href: '/mp/security/03_configuration-secrets', title: 'Configuration Secrets' }
                            ]
                        },
                        {
                            title: 'Scheduling',
                            action: 'access_alarm',
                            group: '/mp/scheduling',
                            items: [
                                { href: '/mp/scheduling/01_introduction', title: 'Overview' }
                            ]
                        },
                        {
                            title: 'Tracing',
                            action: 'timeline',
                            group: '/mp/tracing',
                            items: [
                                { href: '/mp/tracing/01_tracing', title: 'Tracing' },
                                { href: '/mp/tracing/02_zipkin', title: 'Zipkin Tracing' },
                                { href: '/mp/tracing/03_jaeger', title: 'Jaeger Tracing' },
                                { href: '/mp/tracing/04_jaeger_metrics', title: 'Metrics Support for Jaeger' }
                            ]
                        },
                        {
                            title: 'Vault',
                            action: 'lock',
                            group: '/mp/vault',
                            items: [
                                { href: '/mp/vault/01_vault', title: 'Vault' }
                            ]
                        },
                        {
                            title: 'Websocket',
                            action: 'sync_alt',
                            group: '/mp/websocket',
                            items: [
                                { href: '/mp/websocket/01_overview', title: 'WebSocket Introduction' }
                            ]
                        },
                        {
                            title: 'AOT',
                            action: 'save',
                            group: '/mp/aot',
                            items: [
                                { href: '/mp/aot/01_introduction', title: 'GraalVM native image' }
                            ]
                        },
                        {
                            title: 'Testing',
                            action: 'thumbs_up_down',
                            group: '/mp/testing',
                            items: [
                                { href: '/mp/testing/01_testing', title: 'Testing with JUnit5' }
                            ]
                        }
                    ]
                },
            ]
        }
        ,{ header: 'Additional resources' },
        {
            title: 'Javadocs',
            action: 'library_books',
            href: 'apidocs/index.html?overview-summary.html',
            target: '_blank'
        },
        {
            title: 'Community',
            action: 'fa-github',
            href: '#/community/01_community',
            target: '_blank'
        }
    ];
}