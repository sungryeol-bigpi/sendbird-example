import SendBird from 'sendbird';

export default class SB {
  constructor(appId) {
    this.sb = new SendBird({ appId });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.sb.connect('newUser', (user, err) => {
        if (err) console.warn(err);
        console.log('user connected', user);
        if (err) return resolve(user);
        resolve(user);
      });
    });
  }
  connectChannel(channelUrl) {
    console.log('connect channel requested');
    return new Promise((resolve, reject) => {
      this.sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
        channel.enter((res, err) => {
          if (err) console.warn(err);
          return resolve(channel);
        })
      });
    });
  }
  getChannels() {
    return new Promise((resolve, reject) => {
      const oc = this.sb.OpenChannel.createOpenChannelListQuery();
      oc.next((channels, err) => {
        if (err) console.warn(err);
        return resolve(channels);
      });
    });
  }
}