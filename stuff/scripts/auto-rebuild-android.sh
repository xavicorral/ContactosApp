#!/usr/bin/expect -f
spawn stuff/scripts/rebuild-android.sh
expect "Enter Passphrase for keystore: "
send -- "p3sERgo\n"
interact

