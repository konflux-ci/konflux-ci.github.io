FROM docker.io/hugomods/hugo:exts

WORKDIR /src

# Copy the website source
COPY website /src

# Expose the Hugo server port
EXPOSE 1313

# Run Hugo server
CMD ["hugo", "server", "--bind", "0.0.0.0", "-D", "--disableFastRender"]
