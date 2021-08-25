import os

command = "npx inline-assets ./webassets/index.html ./ui/index.html"
print("Running:\n" + command)
os.system(command)
