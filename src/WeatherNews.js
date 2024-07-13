export default function WeatherNews({ news, handleLoadNews }) {
  return (
    <span className="w-full h-2/3  bg-common flex flex-col p-4 m-2">
      <p className="text-2xl">Weather News</p>
      <div className="h-bar" />
      <span className="flex flex-col overflow-y-auto overflow-x-hidden">
        {news &&
          news.length > 0 &&
          news.map((news, index) => (
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="p-4 m-2 bg-common button-common flex flex-col">
                <p className="text-sm text-right text-slate-400">
                  Published on {news.publish_date}
                </p>
                <img src={news.image} alt={index} className="rounded-3xl" />
                <p className="bg-common p-2 my-2 break-all">
                  {news.title && news.title.length > 200
                    ? news.title.substring(0, 201) + "..."
                    : news.title}
                  <br />
                  <p className="text-right">
                    Author:{" "}
                    {news.author && news.author.length > 100
                      ? news.author.substring(0, 101)
                      : news.author}
                  </p>
                </p>
                <p className="text-xs text-slate-400 text-end">
                  Visit website for more info
                </p>
              </div>
            </a>
          ))}
        <button
          className="bg-common button-common mx-2"
          onClick={handleLoadNews}
        >
          Load More
        </button>
      </span>
    </span>
  );
}
