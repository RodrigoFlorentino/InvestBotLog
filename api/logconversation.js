require('dotenv-safe').load();

var watson = require('watson-developer-cloud');
var request=require('request');
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 2000);

var wts_username = process.env.WTS_USERNAME;
var wts_password = process.env.WTS_PASSWORD;
var apiHostname = process.env.APIHOSTNAME;
var workspacesId = process.env.WORKSPACE_ID;
var protocol = process.env.NODE_ENV == 'production' ? "https" : "http" ;

var conversation = new watson.ConversationV1({
    username: wts_username,
    password: wts_password,
    version_date: '2018-02-16'
});

var logConversation = {

    get : function(req,res) {

        var params = {
            workspace_id: workspacesId,
        };

        conversation.listLogs(params, function(err, response) {
            if (err) {
                console.log(" logConversation.get Error: " + err);
            } else {
                res.status(200).json(response);
            }
        });

    },

    getEntidades : function(req,res) {

        var params = {
            workspace_id: workspacesId,
        };

        conversation.listEntities(params, function(err, response) {
            if (err) {
                console.log(" logConversation.getEntidades Error: " + err);
            } else {
                res.status(200).json(response);
            }

        });
    },

    getEntidadeValue : function(req,res) {

        var params = {
            workspace_id: workspacesId,
            entity: req.params.entity
        };

        conversation.listValues(params, function(err, response) {
            if (err) {
                console.log(" logConversation.getEntidadeValue Error: " + err);
            } else {
                res.status(200).json(response);
            }
        });
    },

    criarSinonimo : function(req,res) {

        var params = {
            workspace_id: workspacesId,
            entity: req.body.entidade,
            value: req.body.valor,
            synonym: req.body.sinonimo
        };

        conversation.createSynonym(params, function(err, response) {
            if (err) {
                console.error(err);
                console.log(" logConversation.criarSinônimo Error: " + err);
            } else {
                res.status(200).json(response);
            }
        });
    },

    getIntencoes : function(req,res) {

        var params = {
            workspace_id: workspacesId,
        };

        conversation.listIntents(params, function(err, response) {
            if (err) {
                console.log(" logConversation.getIntencoes Error: "+JSON.parse(err));
            } else {
                res.status(200).json(response);
            }

        });
    },

    treinaIntencao : function(req,res) {

        var params = {
            workspace_id: workspacesId,
            intent: req.body.intencao,
            examples: [
                {
                    text: req.body.message
                }
            ]
        };

        conversation.createIntent(params, function(err, response) {
            if (err) {
                console.log(" logConversation.treinaIntencao Error: " + err);
            } else {
                res.status(200).json(response);
            }
        });
    },

    treinaEntidade : function(req,res) {

        var params = {
            workspace_id: workspacesId,
            entity: req.body.entidade,
            values: [
                {
                    value: req.body.valor
                }
            ]
        };

        conversation.createEntity(params, function(err, response) {
            if (err) {
                console.log(" logConversation.treinaIntencao Error: "+ err);
            } else {
                res.status(200).json(response);
            }
        });
    }

}

module.exports = logConversation;