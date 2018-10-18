#!/usr/bin/env bash
ng build --prod --aot --build-optimizer --vendor-chunk=true --output-path=dist
docker build -t openfact/openfact-search-pe .
docker build -t openfact/openfact-search-pe-openshift -f Dockerfile.deploy .
docker tag openfact/openfact-search-pe openfact/openfact-search-pe:$(git rev-parse --short HEAD);
docker tag openfact/openfact-search-pe-openshift openfact/openfact-search-pe-openshift:$(git rev-parse --short HEAD);
docker push openfact/openfact-search-pe:$(git rev-parse --short HEAD)
docker push openfact/openfact-search-pe-openshift:$(git rev-parse --short HEAD)
docker push openfact/openfact-search-pe:latest
docker push openfact/openfact-search-pe-openshift:latest
