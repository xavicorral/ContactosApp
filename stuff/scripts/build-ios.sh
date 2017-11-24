#!/bin/sh
PROJECT_NAME=SmartOSH
SCHEME_NAME=SmartOSH
STARTTIME=$(date +%s);

set -e
set -x

### Build
echo "--- Build [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

ionic build ios

### Moving to ios build directory
echo "--- Moving to ios build directory [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

cd platforms/ios

### Cleaning Xcode
echo "--- Cleaning Xcode [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

/usr/bin/xcodebuild clean      \
    -project $PROJECT_NAME.xcodeproj  \
    -configuration Release     \
    -alltargets

### Archiving
# http://stackoverflow.com/questions/33379291/cordova-app-failing-to-archive-with-xcode-7-1-cordova-cdvviewcontroller-h-file
echo "--- Archiving [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

/usr/bin/xcodebuild archive           \
    -project $PROJECT_NAME.xcodeproj  \
    -scheme $SCHEME_NAME              \
    -archivePath $PROJECT_NAME

### Uploading to AllergensApp
echo "--- Uploading to AllergensApp [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

/usr/local/bin/puck                      \
    -notes_path=../../RELEASE_NOTES.md   \
    -notes_type=markdown                 \
    -submit=auto                         \
    -download=true                       \
    -mandatory=true                      \
    -notify=true                         \
    -force=true                          \
    $PROJECT_NAME.xcarchive

### Summary
echo "-- Total time $(($(date +%s) - $STARTTIME))s"