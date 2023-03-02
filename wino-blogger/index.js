function regexIno(content, pattern = new RegExp(regexs.dictionary, "g")) {
  let match;
  const matchArr = [];
  while ((match = pattern.exec(content))) {
    match = match[1]?.trim();
    if (match) matchArr.push(match);
  }
  return matchArr;
}
//get all post each categories
function urlJsonSearchPostsCategories({
  category = "",
  postId = "",
  query = "",
  blogUrl,
  blogId,
}) {
  return `${
    blogUrl || "https://www.blogger.com/" + blogId
  }/feeds/posts/default/${postId}${
    category ? `-/${category}` : ""
  }?alt=json&${query}`;
}
//fet llop
export default class WinoBlogger {
  blogUrl; // if blogUrl not req blogId
  blogId; //if blogId not req blogeUrl
  saveTmp;
  isBrowser;
  data;
  category = "";
  postId = "";
  query = "";
  variables = [];
  constructor(props) {
    const { blogId = "", isBrowser, saveTmp, blogUrl = "" } = props || [];
    this.blogId = blogId;
    this.isBrowser = isBrowser;
    this.saveTmp = saveTmp;
    this.blogUrl = blogUrl;
  }

  categories(cats = []) {
    this.category = cats?.join("/") || "";
    return this;
  }
  labels(cats = []) {
    this.category = cats?.join("/") || "";
    return this;
  }
  post(postId = "") {
    this.postId = postId;
    return this;
  }
  //fn query
  search(text = "") {
    this.query += `q=${text}&`;
    return this;
  }
  limit(n = 3) {
    this.query += `max-results=${n}&`;
    return this;
  }
  skip(n) {
    if (n) this.query += `start-index=${n}&`;
    return this;
  }
  orderby(value = "published") {
    //or updated
    this.query += `orderby=${value}&`;
    return this;
  }
  //
  callback(cb) {
    this.callback = cb;
    return this;
  }
  setData(data) {
    this.data = data;
    return this;
  }
  getData() {
    return this.data;
  }

  published(dateMin, dateMax) {
    if (dateMin) this.query += `published-min=${dateMin}&`;
    if (dateMax) this.query += `published-max=${dateMax}&`;
    return this;
  }
  updated(dateMin, dateMax) {
    if (dateMin) this.query += `updated-min=${dateMin}&`;
    if (dateMax) this.query += `updated-max=${dateMax}&`;
    return this;
  }
  async load(variables) {
    try {
      const { category, postId, query, blogUrl, blogId } = this;
      if (!this.data) {
        const response = await fetch(
          urlJsonSearchPostsCategories({
            category,
            postId,
            query,
            blogUrl,
            blogId,
          })
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.data = await response.json();
      }
      return this.postId
        ? getPost(this.data?.entry, variables)
        : getPosts(this.data, variables);
    } catch (error) {
      console.error("There was a problem with the fetch request:", error);
    }
  }
  //clone load
  async exec(variables) {
    return await this.load(variables);
  }
}
function getPost(
  {
    id: { $t: _id },
    content: { $t: _content },
    media$thumbnail, //: thumbnail,//{ url: thumbnail },
    published: { $t: published },
    updated: { $t: updated },
    title: { $t: name },
    category,
    link,
  },
  variables = []
) {
  const regexs = {
    https: 'https(.*?)"',
    dictionary: "{(.*?)}",
    tuple: "((.*?))",
    array: "[(.*?)]",
    src: ' src="(.*?)" ',
    video: "<iframe*(.*?) src='*(.*?)' ",
    custom: (_r) => _r,
  };
  _content = _content.replace(/&nbsp;/gi, "");
  //get videos array
  const _videos = new RegExp(regexs.video, "g").exec(_content) || [];
  const videos = _videos[2] || "";
  //get image
  const images =
    regexIno(_content, new RegExp(regexs.src, "g"))?.map((img = "") => img) ||
    [];
  const content = _content.replace(/(<([^>]+)>)/gi, "");
  function getVar({ key, type = "string", regex }) {
    let _res =
      regexIno(_content, new RegExp(regex || `${key}*[:=]*(.*?)[;<]`, "g")) ||
      [];

    if (type === "full") return _res;
    let res = _res[0];
    if (type === "number")
      return res?.match(/\d+(\.\d+)?/g)?.map((_r) => +_r)[0] || 0;
    if (type === "array") return res?.split(",")?.filter((_r) => _r !== "");
    return res;
  }

  const vars = [];
  variables &&
    variables.forEach(({ key, type, regex }) => {
      vars[key] = getVar({ key, type, regex });
    });
  ///
  const categories = category?.map((cat) => cat.term) || [];
  const thumbnail = media$thumbnail?.url;
  const id = _id.split("post-")[1];
  const data = {
    id,
    name,
    thumbnail,
    published,
    videos,
    link,
    images,
    content,
    contentHTML: _content,
    categories,
    category: categories[0],
    updated,
    ...vars,
  };
  if (categories?.includes("$")) return { $: data };
  return { data };
}
function getPosts(dataPosts = [], variables) {
  const posts = [];
  const fnk = [];
  dataPosts.feed?.entry?.forEach((entry) => {
    const post = getPost(entry, variables);
    if (post.$) fnk.push(post.$);
    else posts.push(post.data);
  });
  return { data: posts, $: fnk };
}
