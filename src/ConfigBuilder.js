const inquirer = require('inquirer');
const InquirerConfigBuilder = require('inquirer_config_builder');
const fs = require('fs');

module.exports = class ConfigBuilder {

    constructor() {
        this.configPath = 'config.json';
    }

    promptForConfig(schema, cb) {
        let questions = InquirerConfigBuilder.questions(schema);

        inquirer
            .prompt(questions).then(answers => {
            "use strict";
            let configReadyAnswers = InquirerConfigBuilder.create(answers);
            this.createConfig(configReadyAnswers);
            cb(configReadyAnswers);
        });
    }

    isConfigExists() {
        try {
            fs.accessSync(this.configPath, fs.FS_OK);
            return true;
        } catch (e) {
            return false;
        }
    }

    createConfig(config) {
        return fs.writeFileSync(this.configPath, JSON.stringify(config));
    }
}


