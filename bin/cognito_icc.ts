#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { PipelineStack } from '../lib/pipeline/pipeline-stack'

const app = new cdk.App()

new PipelineStack(app, 'CognitoDevPipelineStack', {
  branch: 'dev',
  awsRegion: 'us-east-1',
  awsAccount: '400781750809',
  env: {
    account: '827417610472',
    region: 'us-east-1',
  },
})

new PipelineStack(app, 'CognitoProdPipelineStack', {
  branch: 'prod',
  awsRegion: 'us-east-1',
  awsAccount: '905014602361',
  env: {
    account: '827417610472',
    region: 'us-east-1',
  },
})

app.synth()
