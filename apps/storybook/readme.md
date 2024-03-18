# Storybook

Serves as a repository wide storybook. Will load stories from any package that has \*.stories files.

Also exposes an encapsulation of the storybook tools you need to define a story. Instead of adding storybook dependencies to each package that wants to define a story, you should add "@yas/storybook" to your package.json and import what you need from there. This will ensure that all stories are using the same version of storybook and addons, and significantly simplifies the dependency management of storybook.
