import os

command = "npx tailwindcss-cli@latest -i css/tailwind.css -o css/tailwind.output.css"
print("Running:\n" + command)
os.system(command)
