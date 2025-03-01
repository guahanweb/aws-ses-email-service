#!/usr/bin/env bash

# be sure we have all the default values, in case CLI is not configured
export AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID:-}
export AWS_REGION=${AWS_REGION:-us-east-1}
export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID:-test}
export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY:-test}
export AWS_PROFILE=${AWS_PROFILE:-}
export AWS_ARTIFACT_BUCKET=${AWS_ARTIFACT_BUCKET:-}
