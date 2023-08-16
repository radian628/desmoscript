import { LanguageSupportFeatures } from "../combined-functionality/language-support-compiler";

type Fn = (...args: any[]) => any;

type Asyncified<F extends Fn> = (
  ...args: Parameters<F>
) => ReturnType<F> extends Promise<any>
  ? ReturnType<F>
  : Promise<ReturnType<F>>;

export type RPCIfied<T> = {
  [K in keyof T]: T[K] extends Fn ? Asyncified<T[K]> : () => Promise<T[K]>;
};

export type RPCChannel = {
  send: (message: any) => void;
  onReceive: (callback: (message: any) => void) => () => void;
};

export function setupRPCCaller<T extends object>(
  channel: RPCChannel
): RPCIfied<T> {
  let id = 0;

  // @ts-expect-error I'm not even gonna try to make this type-safe.
  return new Proxy(
    {},
    {
      get(target, key) {
        // return a getter function that gets the resource remotely
        return (...args: any[]) => {
          return new Promise((resolve, reject) => {
            let myID = id++;
            let settled = false;

            const unsub = channel.onReceive((msg) => {
              if (msg.id === myID) {
                settled = true;
                unsub();
                if (msg.error) {
                  reject(msg.error);
                }

                resolve(msg.data);
              }

              // setTimeout(() => {
              //   if (!settled) {
              //     reject("settle you idiot");
              //   }
              // }, 1000);
            });

            channel.send({
              fn: key,
              args,
              id: myID,
            });
          });
        };
      },
    }
  );
}

export function setupRPCCallee<T extends object>(
  channel: RPCChannel,
  callee: T
) {
  channel.onReceive(async (msg) => {
    if (callee[msg.fn as keyof T]) {
      const remoteProp = callee[msg.fn as keyof T];

      if (typeof remoteProp === "function") {
        try {
          channel.send({
            id: msg.id,
            data: await remoteProp(...msg.args),
          });
        } catch (err) {
          channel.send({
            id: msg.id,
            error: err,
          });
        }
      } else {
        channel.send({
          id: msg.id,
          data: remoteProp,
        });
      }
    } else {
      channel.send({ id: msg.id, data: undefined });
    }
  });
}
