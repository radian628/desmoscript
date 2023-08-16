export function makeBrowserChannelInWorker(channelName: string) {
  return {
    send(msg: any) {
      postMessage({
        channel: channelName,
        msg,
      });
    },

    onReceive(handler: (msg: any) => void) {
      const listener = ({ data: { channel, msg } }) => {
        if (channel !== channelName) return;
        handler(msg);
      };

      globalThis.addEventListener("message", listener);

      return () => globalThis.removeEventListener("message", listener);
    },
  };
}

export function makeBrowserChannelInMain(channelName: string, worker: Worker) {
  return {
    send(msg: any) {
      worker.postMessage({
        channel: channelName,
        msg,
      });
    },

    onReceive(handler: (msg: any) => void) {
      const listener = ({ data: { channel, msg } }) => {
        if (channel !== channelName) return;
        handler(msg);
      };

      worker.addEventListener("message", listener);

      return () => worker.removeEventListener("message", listener);
    },
  };
}
