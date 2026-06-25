import type { FeedItem, FeedItemType } from '../types';

const keywordSets = [
  ['Cloud Storage', 'NAS', 'Synology', 'Quick Connect', 'B Station'],
  ['Product Strategy', 'Research', 'Customer Insight', 'Prioritization'],
  ['React', 'State Management', 'Frontend', 'Architecture'],
  ['Career', 'Learning', 'Communication', 'Growth'],
] as const;

const insightBodies = [
  {
    title: 'Key insight 5',
    body: 'การใช้ NAS เหมาะสำหรับผู้ใช้ที่มีข้อมูลจำนวนมากและต้องการการจัดการที่มีประสิทธิภาพ',
    howToApply: 'เลือกใช้ NAS หากมีความต้องการจัดการข้อมูลจำนวนมากในครอบครัวหรือองค์กร',
    whyImportant: 'ช่วยให้การจัดการข้อมูลเป็นไปอย่างมีระบบและลดความซับซ้อน',
    summary:
      'วิดีโอนี้พูดถึงแนวโน้มของการใช้ Cloud Storage และการพิจารณาใช้ NAS เป็นทางเลือกในการจัดเก็บข้อมูลในปี 2026',
  },
  {
    title: 'Customer discovery pattern',
    body: 'ทีมควรแยกปัญหาจริงของลูกค้าออกจาก feature request ก่อนเริ่มออกแบบ solution',
    howToApply: 'ถามถึงพฤติกรรมในอดีตและ workaround ที่ลูกค้าใช้อยู่ก่อนถามว่าอยากได้ฟีเจอร์อะไร',
    whyImportant: 'ลดโอกาสสร้างฟีเจอร์ที่ดูดีแต่ไม่แก้ pain จริง',
    summary:
      'วิดีโอนี้สรุปวิธีทำ customer discovery ให้เจอปัญหาที่ควรลงทุนแก้จริง ไม่ใช่แค่รับคำขอฟีเจอร์',
  },
  {
    title: 'Frontend state boundary',
    body: 'state ที่อยู่ได้นอก component lifecycle ควรถูกแยกออกจาก local UI state ให้ชัดเจน',
    howToApply: 'เริ่มจาก local state แล้วค่อยย้ายไป context หรือ store เมื่อมีหลายหน้าจอใช้ข้อมูลเดียวกัน',
    whyImportant: 'ช่วยให้โค้ดอ่านง่ายขึ้นและลด global state ที่ไม่จำเป็น',
    summary:
      'วิดีโอนี้อธิบาย mental model สำหรับเลือกตำแหน่ง state ใน React application อย่างเป็นระบบ',
  },
  {
    title: 'Career leverage',
    body: 'การเติบโตในงานเกิดจากการเลือก skill ที่ compound ได้ ไม่ใช่การรับทุกงานให้เยอะที่สุด',
    howToApply: 'ทำ impact log รายสัปดาห์และเลือกหนึ่ง skill ที่สัมพันธ์กับ role ถัดไป',
    whyImportant: 'ช่วยให้การพัฒนาตัวเองเชื่อมกับเป้าหมายอาชีพจริง',
    summary:
      'วิดีโอนี้ชวนวางแผนอาชีพจาก leverage และ evidence แทนการพึ่งความรู้สึกว่าทำงานหนักพอหรือยัง',
  },
];

const feedTypes: FeedItemType[] = ['OUTCOME', 'INSIGHT', 'ACTION', 'SUMMARY'];

export const feedMock: FeedItem[] = Array.from({ length: 24 }, (_, index) => {
  const source = insightBodies[index % insightBodies.length];
  const keywords = [...keywordSets[index % keywordSets.length]];
  const createdAt = new Date(Date.UTC(2026, 5, 25, 7, 30 + index, 0)).toISOString();
  const youtubeVideoId = `demo-video-${index + 1}`;
  const type = feedTypes[index % feedTypes.length];

  return {
    id: `feed-${index + 1}`,
    type,
    title: source.title,
    body: source.body,
    metadata: index % 7 === 0
      ? null
      : {
          insight: source.body,
          howToApply: source.howToApply,
          whyImportant: source.whyImportant,
        },
    keywords,
    score: 24 + (index % 11) + index / 10,
    createdAt,
    analysis: {
      id: `analysis-${index + 1}`,
      language: 'th',
      status: 'COMPLETED',
      summary: index % 5 === 0 ? undefined : source.summary,
      createdAt,
    },
    video: {
      id: `video-${index + 1}`,
      youtubeVideoId,
      youtubeUrl: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
      title: index % 3 === 0 ? null : `Demo video ${index + 1}`,
      thumbnail: null,
      channelName: index % 4 === 0 ? null : 'Youtive Demo',
      duration: index % 2 === 0 ? null : 420 + index * 31,
    },
  };
});

export function getFeedItemById(id: string) {
  return feedMock.find((item) => item.id === id);
}
