@echo off

CALL npx rimraf ./control/node_modules
CALL npx rimraf ./control/obj
CALL npx rimraf ./control/out
CALL npx rimraf ./control/TruncatedNumber/out

CALL npx rimraf ./solution/bin
CALL npx rimraf ./solution/obj
CALL npx rimraf ./solution/dist