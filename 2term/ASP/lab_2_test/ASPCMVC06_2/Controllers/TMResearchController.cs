using Microsoft.AspNetCore.Mvc;

namespace lab2b.Controllers;

public class TMResearchController : Controller
{
    [Route("/")]
    [Route("MResearch/M01/1")]
    [Route("MResearch/M01")]
    [Route("MResearch")]
    [Route("V2/MResearch/M01")]
    [Route("V3/MResearch/{str?}/M01")]
    [HttpGet]
    public string M01(string str)
    {
        if (str is not null)
            return $"GET:M01 - {str}";
        else
            return $"GET:M01";
    }
    
    [Route("V2")]
    [Route("V2/MResearch/M02")]
    [Route("MResearch/M02")]
    [Route("V3/MResearch/{str?}/M02")]
    [HttpGet]
    public string M02(string str)
    {
        if (str is not null)
            return $"GET:M02 - {str}";
        else
            return $"GET:M02";
    }
    [Route("V3")]
    [Route("V3/MResearch/{str?}/")]
    [Route("V3/MResearch/{str?}/M03")]
    [HttpGet]
    public string M03(string str)
    {
        return $"GET:M03";

    }

    [Route("{*url}")]
    [HttpGet]
    public string MXX()
    {
        return "GET:MXX";
    }
}