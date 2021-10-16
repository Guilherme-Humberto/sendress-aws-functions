'use strict';

module.exports.handlerSubscriptionJobs = async (event, context, callback) => {
    const time = new Date();
    return {
        status: true,
        body: `Cron function "${context.functionName}" ran at ${time}`
    }
}