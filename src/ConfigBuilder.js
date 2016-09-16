const inquirer = require('inquirer');
const InquirerConfigBuilder = require('inquirer_config_builder');
const fs = require('fs');
const os =  require('os');
const path = require('path');

module.exports = class ConfigBuilder {

    constructor() {
        this.configPath = path.join(os.homedir(),'.dbsole/config.json');
    }

    getConfigPath(){
        return this.configPath;
    }

    getConfig(){
        return require(this.configPath);
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
        fs.mkdirSync(path.join(os.homedir(),'.dbsole'));
        return fs.writeFileSync(this.configPath, JSON.stringify(config));
    }
}


