export const makeChannel = (
  channelName: string,
  sender: { send?: (data: any) => void },
  receiver: NodeJS.EventEmitter
) => ({
  send(msg: any) {
    console.log(`Sent on channel ${channelName}`, msg);
    sender.send({
      channel: channelName,
      msg,
    });
  },

  onReceive(handler: (msg: any) => void) {
    const listener = ({ channel, msg }) => {
      console.log("received message: ", channel, msg);
      if (channel !== channelName) return;
      console.log(`Received on channel ${channelName}`, msg);
      handler(msg);
    };
    receiver.setMaxListeners(Infinity);
    receiver.on("message", listener);

    return () => receiver.off("message", listener);
  },
});
