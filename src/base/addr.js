var host = process.env.VUE_APP_MOCK_URL
const audio = 'https://ai.baidu.com/aidemo?type=tns2&idx=1&cuid=baidu_speech_demo&cod=2&ctp=1&pdt=1&spd=1&per=0&vol=5&pit=5&tex='

export default { host,
  audioUrl (text, type) {
    text = encodeURI(encodeURI(text))
    return audio + text + '&lan=' + type
  }
}
