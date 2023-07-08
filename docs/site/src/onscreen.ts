export function fireOnceOnScreen(
  target: HTMLElement,
  cb: () => void,
  margin?: number
) {
  if (!margin) margin = 50;
  const observer = new IntersectionObserver(
    (record) => {
      if (record[0]?.isIntersecting) {
        cb();
        observer.disconnect();
      }
    },
    {
      rootMargin: `${margin}px`,
    }
  );
  observer.observe(target);
}
