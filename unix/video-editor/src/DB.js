const fs = require('node:fs');
const path = require('node:path');

const videosPath = path.join(__dirname, '../data/videos.json');
const usersPath = path.join(__dirname, '../data/users.json');
const sessionsPath = path.join(__dirname, '../data/sessions.json');

class DB {
  constructor() {
    this.videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
    /*
     A sample object in this users array would look like:
     { id: 1, name: "Liam Brown", username: "liam23", password: "string" }
    */
    this.users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

    /*
     A sample object in this sessions array would look like:
     { userId: 1, token: 23423423 }
    */
    this.sessions = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
  }

  update() {
    this.videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
    this.users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    this.sessions = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
  }

  save() {
    fs.writeFileSync(videosPath, JSON.stringify(this.videos));
    fs.writeFileSync(usersPath, JSON.stringify(this.users));
    fs.writeFileSync(sessionsPath, JSON.stringify(this.sessions));
  }
}

const db = new DB();

module.exports = db;
