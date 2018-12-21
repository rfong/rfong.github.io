#!/bin/bash
# Run in venv
when-changed templates/*.html -c python compile.py

# If you get an error like "invalid destination port", try:
# 	rm ~/Library/Preferences/com.apple.imservice.ids.FaceTime.plist
