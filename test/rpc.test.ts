import {
  RPCChannel,
  setupRPCCallee,
  setupRPCCaller,
} from "../desmoscript/dist/rpc/rpc";

function createLocalDuplexChannels() {
  const calleeHandlers = new Set<(data: any) => void>();
  const callerHandlers = new Set<(data: any) => void>();

  const calleeChannel: RPCChannel = {
    send(data) {
      for (const h of callerHandlers) {
        h(data);
      }
    },

    onReceive(handler) {
      calleeHandlers.add(handler);
      return () => calleeHandlers.delete(handler);
    },
  };

  const callerChannel: RPCChannel = {
    send(data) {
      for (const h of calleeHandlers) {
        h(data);
      }
    },
    onReceive(handler) {
      callerHandlers.add(handler);
      return () => callerHandlers.delete(handler);
    },
  };

  return {
    caller: callerChannel,
    callee: calleeChannel,
  };
}

test("simple RPC test", () => {
  const channels = createLocalDuplexChannels();

  const api = {
    hello(recipient: string) {
      return `Hello, ${recipient}!`;
    },
  };

  setupRPCCallee(channels.callee, api);

  const remoteAPI = setupRPCCaller<typeof api>(channels.caller);

  expect(remoteAPI.hello("World")).resolves.toEqual("Hello, World!");
  expect(remoteAPI.hello("Desmoscript")).resolves.toEqual(
    "Hello, Desmoscript!"
  );
});
