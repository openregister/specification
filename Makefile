all:
	bikeshed -f spec index.bs

watch:
	bikeshed -f watch index.bs

init:
	pip install --upgrade -r requirements.txt
	bikeshed update
