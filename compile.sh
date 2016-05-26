#!/bin/bash
# Run in venv
when-changed templates/*.html -c python compile.py
