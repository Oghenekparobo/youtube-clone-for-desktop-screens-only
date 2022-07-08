export const amount = 3;

export default function LoadMore({videos , setVideos , showLoadmore ,  author , subscriptions}) {
  return (
    <div className="">
      <button
        onClick={async () => {
          const url = `/api/morevideos?skip=${videos.length}`;
          if (author) {
            url += `&author=${author.id}`
          }

          const res = await fetch(url)
          const data =await  res.json() 

          setVideos([...videos , ...data])
          if(data.length < amount){
              showLoadmore(true)
          }
          if (subscriptions) {
            url += `&subscriptions=${subscriptions}`
          }

        }}
        className="bg-red-500 text-white border border-white py-2 px-4 rounded hover:bg-red-900 hover:text-red-500 transition"
      >
        LoadMore
      </button>
    </div>
  );
}
