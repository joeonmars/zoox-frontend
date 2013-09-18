plovr-project-template
======================

A project template based on Google Closure Library &amp; Plovr (ver Release-Candidate-2013).
Plovr automatically compiles Closure project code, as well as Closure Soy template files.


#System Requirements:
JRE 7 & JDK 7 - Download from www.oracle.com
if still there's issue when building plovr after upgrade, try

$ export JAVA_HOME=$(/usr/libexec/java_home)

$ echo $JAVA_HOME
/Library/Java/JavaVirtualMachines/1.7.0.jdk/Contents/Home


#Instructions:
To compile CSS, open terminal and run "sh pathto/build-compass.sh"
To run plovr, open terminal and run "sh pathto/build-plovr.sh"

To run project in development mode, point virtualhost to "development" directory
To run project in deploy mode, point virtualhost to "deploy" directory

To test the project in advanced compiled mode, use http://../?mode=ADVANCED
To test the project in uncompiled mode (by default), simply ignore the query, or use http://../?mode=SIMPLE


#Misc
Plovr Documentation
http://plovr.com/docs.html

Closure Library API Documentation
http://closure-library.googlecode.com/svn/docs/index.html