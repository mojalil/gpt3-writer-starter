import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Create a template deal for a join venture and partnership between 2 companies, by taking the  input and converting it into the output. 
Provide creative reasoning for the comarketing and trade partnership.
Add references for why numbers are used and why it's a good idea.

Input Example:

- Company 1 is Sonos
- Company 2 is Samsung
- Target Markets: Singapore, Malaysia, Thailand
- Audience: Males in their 30s, earning USD20+k/year
- Timeline: Oct 2022 - Mar 2023
- Goal: Sonos has expressed an interest to work with Samsung. Sonos is a pioneer of wireless audio, holding over 500 patents, supporting 50+ streaming services, and has established its presence in more than 60 countries. Sonos is looking to expand into South Asia/South East Asia and would like to partner with Samsung to offer Sonos speakers with Samsung TVs as bundle deals in the region.


Output Example:
Partnership Idea: Bundle SONOS speakers with all 4k Samsung TV's
Channels: Offer bundle exclusively at Sonos and Samsung retail stores, promoted through social media
Reasoning: Sonos and Samsung have complimentary business and Sonos can offer value added services to samsung customers. While Samsung provides exposure to Sonos.

Sonos offers to Samsung
- Email 350,000 Samsung TV Owners
- Social media marketing for 4 weeks
- Retail support at 50% of Samsung retail partners
- 100 sales representatives at all retail stores

Samsung offers to Sonos
- Email 400,000 SONOS speaker owners
- Provide online and phone support for customers
- Revenue guarantee of $230,000
- Invest $250,000 into building customer awareness

Input Example 2:

- Company 1 is Liveramp
- Company 2 is Adobe Advertising Cloud
- Target Markets: APAC
- Audience: Males & Female Professionals in their 20s to 30s working at advertising company
- Timeline: Oct 2022 - Mar 2023
- Goal: Liveramp want to maximize the value of LifeRamp’s data footprint to drive greater efficiency and impact on advertising businesses in the US and APAC.

Output Example 2:

Partnership Idea: Use LiveRamp data to provide retargeting, analytics, optimization, and enterprise solutions for advertisers. Activate precision targeting to deliver engaging and personalized experience to consumers
Channels: Liveramp and TubeMogul Websites
Marketing Cost: $100,000 USD
Reasoning: Liveramp can provide the platform and data for Adobe to help brands create personalized advertising campaigns through the Adobe DMP

Liveramps offer to Adobe
- Emails of 400,000 LiveRamp users
- Provide online and phone support for customers
- Revenue guarantee of $230,000
- Invest $250,000 into building customer awareness

Adobe offers to Liveramp
- Email 350,000 Adobe users
- Social media marketing for 8 weeks
- Retail support at 50% of Adobe retail partners
- Invest $300,000 into the bundle deal

Input: 

- Company 1 is Microsoft Xbox
- Company 2 is Grab 
- Target Markets: Singapore, Malaysia, Thailand
- Audience: Males in their 20s to 30s, earning USD20+k/year
- Timeline: Oct 2022 - Mar 2023
- Goal: Xbox gaming would like to expand into ecommerce in south east asia. Grab is the most used ride sharing app and food delivery app. Grab does not have retail stores for a physical presense

Output:

Partnership Idea: Bundle Microsoft Xbox with Grab promotional codes
Channels: Offer bundle exclusively through Xbox and Grab app, promoted through social media
Reasoning: Microsoft Xbox has a presence in the gaming industry, and Grab provides a platform for ecommerce. Microsoft Xbox can offer value added services to Grab customers, while Grab provides exposure to Microsoft Xbox. 

Microsoft Xbox offers to Grab
- Email 350,000 Grab app users
- Social media marketing for 8 weeks
- Provide online and phone support for customers
- Revenue guarantee of $200,000
- Invest $250,000 into building customer awareness

Grab offers to Microsoft Xbox
- Email 400,000 Xbox customers
- Offer promotional codes for Xbox products through Grab app
- Retail support at 50% of Xbox retailers 
- Invest $300,000 into the bundle deal 

References:
1. https://www.business2community.com/digital-marketing/co-marketing-campaigns-what-they-are-and-how-to-execute-them-02123777
2. https://www.forbes.com/sites/forbescommunicationscouncil/2020/03/10/how-to-create-an-effective-co-marketing-strategy/#1d6dcd0f54dc
3. https://www.entrepreneur.com/article/311854

Input: 

- Company 1 is Popsockets
- Company 2 is Lazada 
- Target Markets: Singapore, Malaysia, Thailand
- Audience: Males & females aged 14 to 35
- Timeline: Oct 2022 - Mar 2023
- Goal: Popsockets would like to expand it's business into south east asia as it's north american market is shrinking.

Output:
`;

const createUserInputPrompt = (userInput) => {
  const userInputPrompt = `
- Company 1 is ${userInput.company1}
- Company 2 is ${userInput.company2} 
- Target Markets: ${userInput.targetMarkets}
- Audience: ${userInput.audience}
- Timeline: ${userInput.timeline}
- Goal: ${userInput.goal}`;

  return userInputPrompt;
};

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const userInputPrompt = createUserInputPrompt(req.body.userInput);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${userInputPrompt}\nOutput: \n-`,
    temperature: 0.7,
    max_tokens: 2000,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({
    output: basePromptOutput,
  });
};

export default generateAction;
