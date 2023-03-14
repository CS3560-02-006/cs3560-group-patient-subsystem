#!/bin/sh

git subtree pull --prefix frontend https://github.com/CS3560-02-006/cs3560-patient-subsystem-frontend.git main --squash

git subtree pull --prefix backend https://github.com/CS3560-02-006/cs3560-patient-subsystem-backend.git main --squash
