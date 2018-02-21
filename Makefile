all:
	bikeshed -f spec index.bs

watch:
	bikeshed -f watch index.bs

init:
	pip install --upgrade -r requirements.txt
	bikeshed update


## Docker helpers #############################################################

CONTAINER_NAME := registers-specification
INPUT_VOLUME := $(PWD)/index.bs:/usr/src/spec/index.bs
INCLUDE_VOLUME := $(PWD)/include:/usr/src/spec/include
OUTPUT_VOLUME := $(PWD)/index.html:/usr/src/spec/index.html

VOLUMES := -v $(INPUT_VOLUME) \
           -v $(INCLUDE_VOLUME) \
           -v $(OUTPUT_VOLUME)

docker-image:
	docker build -t $(CONTAINER_NAME) .

docker-run:
	docker run --rm -it $(VOLUMES) $(CONTAINER_NAME) bash

docker-build:
	docker run --rm -it $(VOLUMES) $(CONTAINER_NAME) make
