import NextLink from "next/link";

export default function Home() {
  return (
    <div>
      <ul>
        <li>react api 学习</li>
        <ul>
          <li>hook</li>
          <ul>
            <li>
              <NextLink href="/react-api-study/hook/useCallback">
                useCallback
              </NextLink>
            </li>
            <li>
              <NextLink href="/react-api-study/hook/useMemo">useMemo</NextLink>
            </li>
          </ul>
        </ul>
      </ul>

      <ul>
        <li>问题</li>
        <ul>
          <li>
            <NextLink href="/problem/render-by-children">
              render-by-children
            </NextLink>
          </li>
        </ul>
      </ul>
      <ul>
        <li>demo</li>
        <ul>
          <li>
            <NextLink href="/websocket/chat">websocket</NextLink>
          </li>
        </ul>
      </ul>
    </div>
  );
}
