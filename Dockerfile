# Instructions copied from - https://hub.docker.com/_/python/
FROM python:2.7-onbuild

# tell the port number the container should expose
EXPOSE 8888

# run the command
CMD ["python", "./app.py"]
