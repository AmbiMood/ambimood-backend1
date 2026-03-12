
// const axios = require('axios');
// const MoodHistory = require('../models/moodHistory');

// const emotionSearchTerms = {
//   happy: {
//     tamil: 'anirudh rahman happy tamil superhit',
//     hindi: 'bollywood happy dance songs',
//     english: 'pharrell williams happy uptown funk',
//     telugu: 'devi sri prasad butta bomma telugu'
//   },
//   sad: {
//   tamil: 'tamil sad love melody',
//   hindi: 'arijit singh hindi sad',
//   english: 'heartbreak ballad',
//   telugu: 'telugu sad love songs'
// },
//   angry: {
//     tamil: 'yuvan shankar raja mass bgm tamil',
//     hindi: 'divine raftaar rap hindi',
//     english: 'linkin park numb rock angry',
//     telugu: 'ss thaman saaho mass telugu'
//   },
//   neutral: {
//     tamil: 'spb ilayaraja sentimental tamil',
//     hindi: 'kishore kumar old hindi melody',
//     english: 'john lennon imagine classic',
//     telugu: 'spb old classic telugu melody'
//   },
//   disgusted: {
//     tamil: 'tamil flute instrumental meditation',
//     hindi: 'hindi instrumental peaceful flute',
//     english: 'lofi chill beats relaxing',
//     telugu: 'telugu flute instrumental soft'
//   },
//   fearful: {
//     tamil: 'ms subbulakshmi carnatic classical',
//     hindi: 'pandit ravi shankar classical raga',
//     english: 'beethoven moonlight sonata piano',
//     telugu: 'annamayya devotional classical telugu'
//   },
//   surprised: {
//     tamil: 'kolaveri di peppy fun tamil',
//     hindi: 'lungi dance peppy fun hindi',
//     english: 'taylor swift shake it off upbeat',
//     telugu: 'dhinka chika peppy fun telugu'
//   }
// };

// const languageKeywords = {
//   tamil: ['tamil', 'kollywood', 'rahman', 'anirudh', 'harris', 'yuvan', 'spb', 'ilayaraja'],
//   hindi: ['hindi', 'bollywood', 'arijit', 'badshah', 'neha', 'kishore', 'lata', 'raftaar'],
//   english: ['adele', 'ed sheeran', 'pharrell', 'linkin park', 'david guetta', 'taylor', 'beatles', 'beethoven'],
//   telugu: ['telugu', 'tollywood', 'dsp', 'sid sriram', 'ss thaman', 'mm keeravani', 'annamayya']
// };

// const getRecommendations = async (req, res) => {
//   try {
//     const { emotion, language, userEmail } = req.query;

//     if (!emotion || !language) {
//       return res.status(400).json({ message: 'emotion and language required' });
//     }

//     const emotionLower = emotion.toLowerCase();
//     const languageLower = language.toLowerCase();

//     // ✅ MongoDB-ல Mood History save பண்ணு
//     if (userEmail) {
//       try {
//         await MoodHistory.create({
//           userEmail,
//           emotion: emotionLower,
//           language: languageLower,
//         });
//         console.log(`✅ Mood saved: ${userEmail} → ${emotionLower} → ${languageLower}`);
//       } catch (dbErr) {
//         console.log('⚠️ Mood save skipped:', dbErr.message);
//       }
//     }

//     const searchTerm = emotionSearchTerms[emotionLower]?.[languageLower]
//       || `${languageLower} ${emotionLower} songs`;

//     console.log(`🎵 iTunes Searching: "${searchTerm}"`);

//     const response = await axios.get('https://itunes.apple.com/search', {
//       params: {
//         term: searchTerm,
//         media: 'music',
//         entity: 'song',
//         limit: 25,
//         // country: languageLower === 'english' ? 'us' : 'in',
//       },
//       timeout: 20000,
//     });

//     let results = response.data?.results || [];
// if (results.length === 0) {
//   console.log('⚠️ Empty results, trying fallback search...');
//   const fallbackTerm = `${emotionLower} music`;
//   const fallbackResponse = await axios.get('https://itunes.apple.com/search', {
//     params: {
//       term: fallbackTerm,
//       media: 'music',
//       entity: 'song',
//       limit: 20,
//     },
//     timeout: 20000,
//   });
//   results = fallbackResponse.data?.results || [];
// }
//     if (results.length === 0) {
//       return res.json({ songs: [], emotion: emotionLower, language: languageLower });
//     }

//     let songs = results.map((track) => ({
//       name: track.trackName || 'Unknown',
//       artist: track.artistName || 'Unknown',
//       album: track.collectionName || '',
//       fullSongUrl: track.previewUrl || null,
//       artwork: track.artworkUrl100
//         ? track.artworkUrl100.replace('100x100bb', '300x300bb')
//         : null,
//       duration: track.trackTimeMillis
//         ? Math.floor(track.trackTimeMillis / 1000)
//         : 0,
//       itunesUrl: track.trackViewUrl || '',
//     }));

//     // ✅ Language filter
//     const keywords = languageKeywords[languageLower] || [];
//     if (keywords.length > 0) {
//       const filtered = songs.filter(song => {
//         const combined = `${song.name} ${song.artist} ${song.album}`.toLowerCase();
//         return keywords.some(kw => combined.includes(kw));
//       });
//       if (filtered.length >= 5) {
//         songs = filtered;
//         console.log(`🔍 Language filtered: ${filtered.length} ${languageLower} songs`);
//       }
//     }

//     console.log(`✅ Returning ${songs.length} songs for ${emotionLower}+${languageLower}`);
//     res.json({ songs, emotion: emotionLower, language: languageLower });

//   } catch (error) {
//     console.error('❌ Error:', error.message);
//     res.status(500).json({ message: 'Error fetching songs', error: error.message });
//   }
// };

// module.exports = { getRecommendations };




const MoodHistory = require('../models/moodHistory');

// ✅ Hardcoded songs — No API needed, always works!
const songDatabase = {
  happy: {
    tamil: [
      { name: 'Vaathi Coming', artist: 'Anirudh Ravichander', artwork: 'https://i.imgur.com/placeholder.jpg', spotifyUrl: 'https://open.spotify.com/search/Vaathi%20Coming%20Anirudh' },
      { name: 'Arabic Kuthu', artist: 'Anirudh Ravichander', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Arabic%20Kuthu%20Anirudh' },
      { name: 'Whistle Podu', artist: 'Anirudh Ravichander', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Whistle%20Podu%20Anirudh' },
      { name: 'Aaluma Doluma', artist: 'Anirudh Ravichander', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Aaluma%20Doluma' },
      { name: 'Jolly O Gymkhana', artist: 'AR Rahman', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Jolly%20O%20Gymkhana' },
      { name: 'Neruppu Da', artist: 'Anirudh Ravichander', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Neruppu%20Da%20Anirudh' },
    ],
    hindi: [
      { name: 'Badtameez Dil', artist: 'Pritam', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Badtameez%20Dil' },
      { name: 'London Thumakda', artist: 'Sachin Jigar', artwork: '', spotifyUrl: 'https://open.spotify.com/search/London%20Thumakda' },
      { name: 'Balam Pichkari', artist: 'Vishal Shekhar', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Balam%20Pichkari' },
      { name: 'Gallan Goodiyaan', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Gallan%20Goodiyaan' },
      { name: 'Nagada Sang Dhol', artist: 'Shreya Ghoshal', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Nagada%20Sang%20Dhol' },
      { name: 'Malhari', artist: 'Vishal Shekhar', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Malhari' },
    ],
    english: [
      { name: 'Happy', artist: 'Pharrell Williams', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Happy%20Pharrell%20Williams' },
      { name: 'Uptown Funk', artist: 'Bruno Mars', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Uptown%20Funk%20Bruno%20Mars' },
      { name: "Can't Stop the Feeling", artist: 'Justin Timberlake', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Cant%20Stop%20The%20Feeling' },
      { name: 'Good as Hell', artist: 'Lizzo', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Good%20As%20Hell%20Lizzo' },
      { name: 'Walking on Sunshine', artist: 'Katrina and The Waves', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Walking%20On%20Sunshine' },
      { name: 'Shake It Off', artist: 'Taylor Swift', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Shake%20It%20Off%20Taylor%20Swift' },
    ],
    telugu: [
      { name: 'Butta Bomma', artist: 'Armaan Malik', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Butta%20Bomma' },
      { name: 'Naatu Naatu', artist: 'MM Keeravani', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Naatu%20Naatu' },
      { name: 'Samajavaragamana', artist: 'Sid Sriram', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Samajavaragamana' },
      { name: 'Seeti Maar', artist: 'DSP', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Seeti%20Maar%20Telugu' },
      { name: 'Dhinka Chika', artist: 'DSP', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Dhinka%20Chika' },
    ],
  },
  sad: {
    tamil: [
      { name: 'Munbe Vaa', artist: 'AR Rahman', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Munbe%20Vaa%20AR%20Rahman' },
      { name: 'Nenjame', artist: 'Harris Jayaraj', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Nenjame%20Harris%20Jayaraj' },
      { name: 'Ennodu Nee Irundhaal', artist: 'AR Rahman', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Ennodu%20Nee%20Irundhaal' },
      { name: 'Idhazhin Oram', artist: 'AR Rahman', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Idhazhin%20Oram' },
      { name: 'Vinnaithaandi Varuvaayaa', artist: 'AR Rahman', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Vinnaithaandi%20Varuvaayaa' },
      { name: 'Nee Paartha Vizhigal', artist: 'Sid Sriram', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Nee%20Paartha%20Vizhigal' },
    ],
    hindi: [
      { name: 'Channa Mereya', artist: 'Arijit Singh', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Channa%20Mereya%20Arijit' },
      { name: 'Tum Hi Ho', artist: 'Arijit Singh', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Tum%20Hi%20Ho%20Arijit' },
      { name: 'Agar Tum Saath Ho', artist: 'Arijit Singh', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Agar%20Tum%20Saath%20Ho' },
      { name: 'Kabira', artist: 'Arijit Singh', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Kabira%20Arijit' },
      { name: 'Phir Bhi Tumko Chahunga', artist: 'Arijit Singh', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Phir%20Bhi%20Tumko%20Chahunga' },
      { name: 'Lag Ja Gale', artist: 'Lata Mangeshkar', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Lag%20Ja%20Gale' },
    ],
    english: [
      { name: 'Someone Like You', artist: 'Adele', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Someone%20Like%20You%20Adele' },
      { name: 'Let Her Go', artist: 'Passenger', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Let%20Her%20Go%20Passenger' },
      { name: 'Fix You', artist: 'Coldplay', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Fix%20You%20Coldplay' },
      { name: 'Stay With Me', artist: 'Sam Smith', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Stay%20With%20Me%20Sam%20Smith' },
      { name: 'The Night We Met', artist: 'Lord Huron', artwork: '', spotifyUrl: 'https://open.spotify.com/search/The%20Night%20We%20Met' },
      { name: 'All I Want', artist: 'Kodaline', artwork: '', spotifyUrl: 'https://open.spotify.com/search/All%20I%20Want%20Kodaline' },
    ],
    telugu: [
      { name: 'Ye Fontana', artist: 'Sid Sriram', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Ye%20Fontana%20Sid%20Sriram' },
      { name: 'Srivalli', artist: 'Sid Sriram', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Srivalli%20Sid%20Sriram' },
      { name: 'Inkem Inkem', artist: 'Sid Sriram', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Inkem%20Inkem%20Sid%20Sriram' },
      { name: 'Jalaja', artist: 'MM Keeravani', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Jalaja%20Telugu' },
      { name: 'Nee Kannu Neeru', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Nee%20Kannu%20Neeru%20Telugu' },
    ],
  },
  angry: {
    tamil: [
      { name: 'Beast Mode', artist: 'Anirudh Ravichander', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Beast%20Mode%20Anirudh' },
      { name: 'Mersal Arasan', artist: 'AR Rahman', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Mersal%20Arasan' },
      { name: 'Verithanam', artist: 'AR Rahman', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Verithanam%20AR%20Rahman' },
      { name: 'Enjoy Enjaami', artist: 'Dhee ft Arivu', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Enjoy%20Enjaami' },
      { name: 'Kutti Story', artist: 'Anirudh Ravichander', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Kutti%20Story%20Anirudh' },
      { name: 'Danga Maari Oodhari', artist: 'Yuvan Shankar Raja', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Danga%20Maari%20Oodhari' },
    ],
    hindi: [
      { name: 'Mere Gully Mein', artist: 'Divine', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Mere%20Gully%20Mein%20Divine' },
      { name: 'Wakhra Swag', artist: 'Badshah', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Wakhra%20Swag%20Badshah' },
      { name: 'Gali Gali', artist: 'KK', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Gali%20Gali%20Hindi' },
      { name: 'Zinda', artist: 'Siddharth Mahadevan', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Zinda%20Bhaag%20Hindi' },
      { name: 'Sher Aaya Sher', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Sher%20Aaya%20Sher' },
    ],
    english: [
      { name: 'In The End', artist: 'Linkin Park', artwork: '', spotifyUrl: 'https://open.spotify.com/search/In%20The%20End%20Linkin%20Park' },
      { name: 'Numb', artist: 'Linkin Park', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Numb%20Linkin%20Park' },
      { name: 'Wake Me Up Inside', artist: 'Evanescence', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Wake%20Me%20Up%20Evanescence' },
      { name: 'Break Stuff', artist: 'Limp Bizkit', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Break%20Stuff%20Limp%20Bizkit' },
      { name: 'Given Up', artist: 'Linkin Park', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Given%20Up%20Linkin%20Park' },
    ],
    telugu: [
      { name: 'Saaho BGM', artist: 'DSP', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Saaho%20BGM%20DSP' },
      { name: 'RRR Theme', artist: 'MM Keeravani', artwork: '', spotifyUrl: 'https://open.spotify.com/search/RRR%20Theme%20Keeravani' },
      { name: 'Pushpa Mass BGM', artist: 'DSP', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Pushpa%20BGM%20DSP' },
      { name: 'Oo Antava', artist: 'DSP', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Oo%20Antava%20DSP' },
      { name: 'Jago Jago', artist: 'DSP', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Jago%20Jago%20Telugu' },
    ],
  },
  neutral: {
    tamil: [
      { name: 'En Iniya Pon Nilave', artist: 'Ilaiyaraaja', artwork: '', spotifyUrl: 'https://open.spotify.com/search/En%20Iniya%20Pon%20Nilave' },
      { name: 'Chinna Chinna Aasai', artist: 'AR Rahman', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Chinna%20Chinna%20Aasai' },
      { name: 'Poo Malai Vaangi', artist: 'SPB', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Poo%20Malai%20Vaangi%20SPB' },
      { name: 'Thenmerku Paruvakatru', artist: 'Ilaiyaraaja', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Thenmerku%20Paruvakatru' },
      { name: 'Roja Janani', artist: 'AR Rahman', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Roja%20Janani%20AR%20Rahman' },
    ],
    hindi: [
      { name: 'Lag Ja Gale', artist: 'Lata Mangeshkar', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Lag%20Ja%20Gale%20Lata' },
      { name: 'Yeh Dosti', artist: 'Kishore Kumar', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Yeh%20Dosti%20Kishore' },
      { name: 'Zindagi Ek Safar', artist: 'Kishore Kumar', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Zindagi%20Ek%20Safar' },
      { name: 'Ajeeb Dastan Hai Yeh', artist: 'Lata Mangeshkar', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Ajeeb%20Dastan%20Hai%20Yeh' },
      { name: 'Ek Pyaar Ka Nagma Hai', artist: 'Lata Mangeshkar', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Ek%20Pyaar%20Ka%20Nagma' },
    ],
    english: [
      { name: 'Imagine', artist: 'John Lennon', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Imagine%20John%20Lennon' },
      { name: 'Hotel California', artist: 'Eagles', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Hotel%20California%20Eagles' },
      { name: 'Bohemian Rhapsody', artist: 'Queen', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Bohemian%20Rhapsody%20Queen' },
      { name: 'Let It Be', artist: 'The Beatles', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Let%20It%20Be%20Beatles' },
      { name: 'Wonderwall', artist: 'Oasis', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Wonderwall%20Oasis' },
    ],
    telugu: [
      { name: 'Annamayya Keerthana', artist: 'SP Balasubrahmanyam', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Annamayya%20SPB' },
      { name: 'Evaro Evaro', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Evaro%20Evaro%20Telugu' },
      { name: 'Nee Cheli', artist: 'SP Balasubrahmanyam', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Nee%20Cheli%20SPB' },
      { name: 'Manmadhudu Theme', artist: 'DSP', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Manmadhudu%20Telugu' },
      { name: 'Ye Tara', artist: 'MM Keeravani', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Ye%20Tara%20Telugu' },
    ],
  },
  fearful: {
    tamil: [
      { name: 'Suprabhatham', artist: 'MS Subbulakshmi', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Suprabhatham%20MS%20Subbulakshmi' },
      { name: 'Thiruppugazh', artist: 'Traditional', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Thiruppugazh%20Tamil' },
      { name: 'Karpagame', artist: 'Ilaiyaraaja', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Karpagame%20Ilaiyaraaja' },
      { name: 'Murugan Devotional', artist: 'SPB', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Murugan%20Songs%20SPB' },
      { name: 'Om Namah Shivaya', artist: 'SPB', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Om%20Namah%20Shivaya%20Tamil' },
    ],
    hindi: [
      { name: 'Hanuman Chalisa', artist: 'Hariharan', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Hanuman%20Chalisa%20Hariharan' },
      { name: 'Om Jai Jagdish', artist: 'Anuradha Paudwal', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Om%20Jai%20Jagdish%20Hare' },
      { name: 'Gayatri Mantra', artist: 'Anuradha Paudwal', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Gayatri%20Mantra' },
      { name: 'Mahamrityunjaya Mantra', artist: 'Traditional', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Mahamrityunjaya%20Mantra' },
      { name: 'Jai Ambe Gauri', artist: 'Traditional', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Jai%20Ambe%20Gauri' },
    ],
    english: [
      { name: 'Moonlight Sonata', artist: 'Beethoven', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Moonlight%20Sonata%20Beethoven' },
      { name: 'Clair de Lune', artist: 'Debussy', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Clair%20De%20Lune%20Debussy' },
      { name: 'Canon in D', artist: 'Pachelbel', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Canon%20In%20D%20Pachelbel' },
      { name: 'Ave Maria', artist: 'Schubert', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Ave%20Maria%20Schubert' },
      { name: 'Fur Elise', artist: 'Beethoven', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Fur%20Elise%20Beethoven' },
    ],
    telugu: [
      { name: 'Venkateswara Suprabhatham', artist: 'MS Subbulakshmi', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Venkateswara%20Suprabhatham' },
      { name: 'Annamayya Devotional', artist: 'SP Balasubrahmanyam', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Annamayya%20Devotional%20SPB' },
      { name: 'Govinda Namalu', artist: 'Traditional', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Govinda%20Namalu%20Telugu' },
      { name: 'Durga Devi Stotram', artist: 'Traditional', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Durga%20Stotram%20Telugu' },
      { name: 'Lalitha Sahasranamam', artist: 'MS Subbulakshmi', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Lalitha%20Sahasranamam' },
    ],
  },
  disgusted: {
    tamil: [
      { name: 'Carnatic Flute', artist: 'N Ramani', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Carnatic%20Flute%20N%20Ramani' },
      { name: 'Veena Meditation', artist: 'E Gayathri', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Veena%20Classical%20Tamil' },
      { name: 'Tamil Instrumental', artist: 'Ilaiyaraaja', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Tamil%20Instrumental%20Ilaiyaraaja' },
      { name: 'Nadhaswaram Classical', artist: 'Traditional', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Nadhaswaram%20Classical' },
      { name: 'Sitar Tamil Ragas', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Sitar%20Tamil%20Ragas' },
    ],
    hindi: [
      { name: 'Raag Yaman', artist: 'Pandit Ravi Shankar', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Raag%20Yaman%20Ravi%20Shankar' },
      { name: 'Flute Meditation', artist: 'Hariprasad Chaurasia', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Hariprasad%20Chaurasia%20Flute' },
      { name: 'Tabla Classical', artist: 'Zakir Hussain', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Zakir%20Hussain%20Tabla' },
      { name: 'Sitar Bhairavi', artist: 'Vilayat Khan', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Vilayat%20Khan%20Sitar' },
      { name: 'Morning Ragas', artist: 'Pandit Ravi Shankar', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Morning%20Ragas%20Ravi%20Shankar' },
    ],
    english: [
      { name: 'Lofi Hip Hop Beats', artist: 'ChilledCow', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Lofi%20Hip%20Hop%20Beats' },
      { name: 'Rain Sounds', artist: 'Nature Sounds', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Rain%20Sounds%20Relaxing' },
      { name: 'Ocean Waves', artist: 'Nature Sounds', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Ocean%20Waves%20Relaxing' },
      { name: 'Piano Meditation', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Piano%20Meditation%20Music' },
      { name: 'Study Lofi', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Study%20Lofi%20Music' },
    ],
    telugu: [
      { name: 'Telugu Flute Classical', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Telugu%20Flute%20Classical' },
      { name: 'Carnatic Violin', artist: 'L Subramaniam', artwork: '', spotifyUrl: 'https://open.spotify.com/search/L%20Subramaniam%20Violin' },
      { name: 'Veena Classical Telugu', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Veena%20Classical%20Telugu' },
      { name: 'Telugu Meditation', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Telugu%20Meditation%20Music' },
      { name: 'Sitar Ragas Telugu', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Sitar%20Ragas%20Telugu' },
    ],
  },
  surprised: {
    tamil: [
      { name: 'Why This Kolaveri Di', artist: 'Anirudh Ravichander', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Why%20This%20Kolaveri%20Di' },
      { name: 'Selfie Pulla', artist: 'Anirudh Ravichander', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Selfie%20Pulla%20Anirudh' },
      { name: 'Maari Thara Local', artist: 'Anirudh Ravichander', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Maari%20Thara%20Local' },
      { name: 'Iphone Kaadhali', artist: 'Anirudh Ravichander', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Iphone%20Kaadhali%20Anirudh' },
      { name: 'Taxi Taxi', artist: 'Anirudh Ravichander', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Taxi%20Taxi%20Tamil' },
    ],
    hindi: [
      { name: 'Lungi Dance', artist: 'Yo Yo Honey Singh', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Lungi%20Dance%20Honey%20Singh' },
      { name: 'Party Toh Banti Hai', artist: 'Mika Singh', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Party%20Toh%20Banti%20Hai' },
      { name: 'Abhi Toh Party Shuru Hui Hai', artist: 'Badshah', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Abhi%20Toh%20Party%20Shuru%20Hui' },
      { name: 'Saturday Saturday', artist: 'Indeep Bakshi', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Saturday%20Saturday%20Indeep%20Bakshi' },
      { name: 'Desi Beat', artist: 'Badshah', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Desi%20Beat%20Badshah' },
    ],
    english: [
      { name: 'Shake It Off', artist: 'Taylor Swift', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Shake%20It%20Off%20Taylor%20Swift' },
      { name: 'Roar', artist: 'Katy Perry', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Roar%20Katy%20Perry' },
      { name: 'Dynamite', artist: 'BTS', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Dynamite%20BTS' },
      { name: 'Blinding Lights', artist: 'The Weeknd', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Blinding%20Lights%20Weeknd' },
      { name: 'Levitating', artist: 'Dua Lipa', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Levitating%20Dua%20Lipa' },
    ],
    telugu: [
      { name: 'Dhinka Chika', artist: 'DSP', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Dhinka%20Chika%20Telugu' },
      { name: 'Rangamma Mangamma', artist: 'SS Thaman', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Rangamma%20Mangamma%20Telugu' },
      { name: 'Pattas Theme', artist: 'Vivek Mervin', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Pattas%20Telugu' },
      { name: 'Uppena Fun Song', artist: 'DSP', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Uppena%20Songs%20Telugu' },
      { name: 'Rowdy Baby Telugu', artist: 'Various', artwork: '', spotifyUrl: 'https://open.spotify.com/search/Rowdy%20Baby%20Telugu' },
    ],
  },
};

const getRecommendations = async (req, res) => {
  try {
    const { emotion, language, userEmail } = req.query;

    if (!emotion || !language) {
      return res.status(400).json({ message: 'emotion and language required' });
    }

    const emotionLower = emotion.toLowerCase();
    const languageLower = language.toLowerCase();

    // ✅ MongoDB-ல Mood History save
    if (userEmail) {
      try {
        await MoodHistory.create({
          userEmail,
          emotion: emotionLower,
          language: languageLower,
        });
        console.log(`✅ Mood saved: ${userEmail} → ${emotionLower} → ${languageLower}`);
      } catch (dbErr) {
        console.log('⚠️ Mood save skipped:', dbErr.message);
      }
    }

    // ✅ Database-லிருந்து songs எடு — No API, instant!
    const songs = songDatabase[emotionLower]?.[languageLower] || [];

    if (songs.length === 0) {
      console.log(`⚠️ No songs for ${emotionLower}+${languageLower}`);
      return res.json({ songs: [], emotion: emotionLower, language: languageLower });
    }

    console.log(`✅ Returning ${songs.length} songs for ${emotionLower}+${languageLower}`);
    res.json({ songs, emotion: emotionLower, language: languageLower });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

module.exports = { getRecommendations };