'use strict';

const AWS = require('aws-sdk')
const EmailService = new AWS.SES({ apiVersion: '2010-12-01' });

module.exports.handlerSendEmail = async (event, context, callback) => {
  event.Records.forEach(record => {
    const { body } = record

    body = JSON.parse(body)
    console.log('Converting body from JSON')
    
    const params = {
      'Destination': {
        'ToAddresses': [body.to]
      },
      'Source': body.from,
      'Message': {
        'Subject': {
          'Data': body.subject
        },
        'Body': {
          'Text': {
            'Data': body.content
          }
        }
      },
    }

    console.log('Format template params')

    EmailService.sendEmail(params, (err, res) => {
      console.log('Inside Ses')
      callback(null, { err, data: res })

      if(err) {
        console.log(err)
        context.fail(err)
      } else {
        console.log(res)
        context.succeed(res)
      }
    })
  })
};
