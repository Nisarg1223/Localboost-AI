import { generateSEOKeywords, generatePosts ,analyzeCompetitor } from "../services/seo.service.js";

 const generateSEO = async (req,res)=>{
    try{
        const {businessName,location,category} = req.body;
        if(!businessName || !location || !category){
            throw new Error("Please provide businessName,location,category");
        }
        const keywords = await generateSEOKeywords({ businessName, location, category });
        const posts = await generatePosts({ businessName, location, category });
        const competitors = await analyzeCompetitor({ businessName, location, category });
    
    return res.status(200).json({
      success: true,
      data: { businessName, location, category, keywords,posts,competitors },
    });
    } catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

export {generateSEO}