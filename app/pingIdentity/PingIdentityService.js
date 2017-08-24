class PingIdentityService {
  constructor() {
    this._hostName = 'LmDigitalStore';
    this._ipAddress = '0.0.0.0';
    this._store = 'missing_store';
    this._processEnvType = 'missing_process';
    this._version = 'missing_version';
    this._usersSessionCount = 0;
    this.seconds = 60;
    this.interval = 1000 * this.seconds;
    this.ping = this.ping.bind(this);
    this.startIdentityDaemon = this.startIdentityDaemon.bind(this);
  }

  set hostName(hostName) {
    this._hostName = hostName;
  }

  set ipAddress(ipAddress) {
    this._ipAddress = ipAddress;
  }

  set store(store) {
    const { code, name } = store.toJS();
    if (code && name) {
      this._store = `${code} - ${name}`;
    }
  }

  set processEnvType(processEnv) {
    this._processEnvType = processEnv;
  }

  set version(version) {
    this._version = version;
  }

  set usersSessionCount(sessions) {
    this._usersSessionCount = sessions;
  }

  get usersSessionCount() {
    return this._usersSessionCount;
  }

  ping() {
    const { _hostName, _ipAddress, _store, _processEnvType, _version, _usersSessionCount } = this;
    const msg = `
    HostName: ${_hostName}
    IpAddress: ${_ipAddress}
    Store: ${_store}
    ProcessEnv: ${_processEnvType}
    Version: ${_version}
    UsersSession: ${_usersSessionCount}
    `;
    console.log(msg);
  }

  startIdentityDaemon() {
    setInterval(this.ping, this.interval);
  }
}

export default new PingIdentityService();
