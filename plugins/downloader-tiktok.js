    await conn.relayMessage(m.chat, prep.message, {messageId: prep.key.id, mentions: [m.sender]});
    const dataF = await tiktok.v1(args[0]);
    // let desc1 =  `*𝙽𝙸𝙲𝙺𝙽𝙰𝙼𝙴:* ${dataF.nickname || 'Indefinido'}`
    const desc1 = `*¡Hola! 🌟*\n*📽️ Aquí tienes tu video de TikTok.*\n\n*Recuerda que si deseas convertir el video en audio, puedes hacerlo fácilmente respondiendo al video con el comando #tomp3 🎧.*`;
    await conn.sendMessage(m.chat, {video: {url: dataF.play}, caption: desc1}, {quoted: m});
  } catch (e1) {
    try {
      const tTiktok = await tiktokdlF(args[0]);
      // let desc2 = `🔗 *Url:* ${tTiktok.video}`
      const desc2 = `*¡Hola! 🌟*\n*📽️ Aquí tienes tu video de TikTok.*\n\n*Recuerda que si deseas convertir el video en audio, puedes hacerlo fácilmente respondiendo al video con el comando #tomp3 🎧.*`;
      await conn.sendMessage(m.chat, {video: {url: tTiktok.video}, caption: desc2}, {quoted: m});
    } catch (e2) {
      try {
        const p = await fg.tiktok(args[0]);
        // let te = `*𝚄𝚂𝙴𝚁𝙽𝙰𝙼𝙴:* ${p.author || 'Indefinido'}`
        const te = `*¡Hola! 🌟*\n*📽️ Aquí tienes tu video de TikTok.*\n\n*Recuerda que si deseas convertir el video en audio, puedes hacerlo fácilmente respondiendo al video con el comando #tomp3 🎧.*`;
        await conn.sendMessage(m.chat, {video: {url: p.nowm}, caption: te}, {quoted: m});
      } catch (e3) {
        try {
          const {author: {nickname}, video, description} = await tiktokdl(args[0]);
          const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd;
          // let cap = `*𝙽𝙸𝙲𝙺𝙽𝙰𝙼𝙴:* ${nickname || 'Indefinido'}`
          const cap = `*¡Hola! 🌟*\n*📽️ Aquí tienes tu video de TikTok.*\n\n*Recuerda que si deseas convertir el video en audio, puedes hacerlo fácilmente respondiendo al video con el comando #tomp3 🎧.*`;
          await conn.sendMessage(m.chat, {video: {url: url}, caption: cap}, {quoted: m});
        } catch {
          throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙻𝙾 𝙻𝙰𝙼𝙴𝙽𝚃𝙾, 𝙾𝙲𝚄𝚁𝚁𝙸𝙾 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝚂𝚄 𝚅𝙸𝙳𝙴𝙾, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾*`;
        }
      }
    }
  }
};
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm|tt|ttnowm|tiktokaudio)$/i;
export default handler;

async function tiktokdlF(url) {
  if (!/tiktok/.test(url)) return 'Enlace incorrecto';
  const gettoken = await axios.get('https://tikdown.org/id');
  const $ = cheerio.load(gettoken.data);
  const token = $('#download-form > input[type=hidden]:nth-child(2)').attr( 'value' );
  const param = {url: url, _token: token};
  const {data} = await axios.request('https://tikdown.org/getAjax?', {method: 'post', data: new URLSearchParams(Object.entries(param)), headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36'}});
  const getdata = cheerio.load(data.html);
  if (data.status) {
    return {status: true, thumbnail: getdata('img').attr('src'), video: getdata('div.download-links > div:nth-child(1) > a').attr('href'), audio: getdata('div.download-links > div:nth-child(2) > a').attr('href')};
  } else {
    return {status: false};
  }
}