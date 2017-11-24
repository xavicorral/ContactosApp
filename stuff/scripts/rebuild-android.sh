#!/bin/sh

APP_NAME=contactos

MESSAGE="
This script will first delete the old .apk using:

> adb uninstall org.puntmultimedia.$APP_NAME

Then it will install the new one with:

> adb install stuff/out/$APP_NAME.apk

To see all packages installed:

> adb shell pm list packages | grep 'prevencontrol'

"
adb uninstall com.prevencontrol.$APP_NAME

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
# jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore stuff/keys/rs-prevencontrol-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk [alias_name]
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore stuff/keys/my-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk contactos
echo "${GREY}"

echo "Optimizing app $APP_NAME..."

echo "${LIGHT_GREY}"
rm platforms/android/build/outputs/apk/$APP_NAME.apk
$ANDROID_HOME/build-tools/25.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/$APP_NAME.apk
echo "${GREY}"

echo "Moving app (.apk) to warehouse (~/stuff/out)"
echo "${LIGHT_GREY}"
mv platforms/android/build/outputs/apk/$APP_NAME.apk stuff/out/
echo "${GREY}"

MESSAGE="

Installing the new .apk:

"

echo "${GREEN}"
echo "$MESSAGE"
echo "${NC}"

adb install stuff/out/$APP_NAME.apk

