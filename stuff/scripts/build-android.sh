#!/bin/sh

APP_NAME=ContactosApp

LIGHT_GREY='\033[37m'
GREY='\033[1;30m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "Building app $APP_NAME..."

echo "${LIGHT_GREY}"
ionic cordova build android --release
echo "${GREY}"

echo "Signing app $APP_NAME..."

echo "${LIGHT_GREY}"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore stuff/keys/contactos-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk contactos
echo "${GREY}"

echo "Optimizing app $APP_NAME..."

echo "${LIGHT_GREY}"
rm platforms/android/build/outputs/apk/$APP_NAME.apk
zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/$APP_NAME.apk
echo "${GREY}"

echo "Moving app (.apk) to warehouse (~/stuff/out)"
echo "${LIGHT_GREY}"
mv platforms/android/build/outputs/apk/$APP_NAME.apk stuff/out/
echo "${GREY}"

MESSAGE="

Now you can install the created .apk doing:

> adb install stuff/out/$APP_NAME.apk

Remember to first delete the old one!

> adb uninstall org.puntmultimedia.$APP_NAME

To see all packages installed:

> adb shell pm list packages | grep 'puntmultimedia'

"

echo "${GREEN}"
echo "$MESSAGE"
echo "${NC}"
