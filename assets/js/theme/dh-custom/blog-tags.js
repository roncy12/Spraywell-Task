import utils from '@bigcommerce/stencil-utils';
let uniqueTag = [];

export default function (context) {
    let loadingOverlay = $(".custom-blog-list-wrap .loadingOverlay");
    if($('.type-blog,.type-blog_post').length){        

        getAllBlogUrl();
        const requestOptions = {
            template: "dh-custom/blog/related-blog",
            config: {
                blog: {
                    recent_posts: {
                        limit: 6,
                    },
                },
            },
        };

        utils.api.getPage("/", requestOptions, (err, res) => {
            loadingOverlay.show();
            if (err) {
                return false;
            }

            // $('.type-blog_post main .custom-blog-list').html($(res).find('.home-blog-list').html());
            $('.type-blog_post main .custom-blog-list').html(res);
            removeSpaceFromDate();
            relatedBlogSlider();
            loadingOverlay.hide();
        });

        let viewMoretags = false;
        $(".see-all-tag .button").on("click",()=>{
            /*============ If 2nd time btn click don't request content again ============*/
            if(viewMoretags){
                return;
            }
            $("#viewMoreTag").show();
            $(".view-more-topic").fadeIn(1000);
            $(".see-all-tag .button").find(".plus").hide();
            $(".see-all-tag .button").find(".minus").show();
            $(".see-all-tag .button").off("click").css("opacity","0.4");
            $("#viewMoreTag").hide();
            viewMoretags = true;
            $(".see-all-tag .button").attr("title","There are no more topics");
        });

    }

}


function getAllBlogUrl(){
    let allUrls = [];
    const requestOptions1 = {
        template: "dh-custom/blog/all-blog-url",
        config: {
            blog: {
                posts: {
                    limit: 10,
                },
            },
        },
    };
    utils.api.getPage("/blog", requestOptions1, (err, content) => {
        try{
            $(content).find("li a").each((i,ela)=>{
                allUrls.push($(ela).attr('href'));
            });
            // console.log(allUrls.sort().reverse());
            getAllTag(allUrls);

        }catch(err){
            console.log(err);
        }
    });

}

function getAllTag(blogurls){
    /****************Fetch all tags from blog posts ****************/
    if(blogurls.length > 0){
        let liHtml = "";
        let p = 0;
        for(let url of blogurls){
            utils.api.getPage(url, {template:"dh-custom/blog/all-blog-tags"}, (err, content) => {
                if (err) {
                    $('.tags-block').remove();
                    return false;
                }
                /*============ Remove Dublicate Tag From Blog ============*/
                $(content).find("a").each((i,el)=>{
                    let liUrl = $(el).attr("href");
                    let liText = $(el).text();

                    if($.inArray(liText,uniqueTag) === -1){
                        uniqueTag.push(liText);
                        if(uniqueTag.length > 8){
                            liHtml+= `<div class="view-more-topic tag-item"><a href="${liUrl}">${liText}</a></div>`;
                        }else{
                            liHtml+= `<div class="tag-item"><a href="${liUrl}">${liText}</a></div>`;
                        }

                    }
                });                

                $(".all-tags").html(liHtml);                                                
                if(uniqueTag.length > 8){
                    $(".see-all-tag").show();
                }

            });
            
        }
        
    }    
}


function removeSpaceFromDate(){
    if(window.location.href.indexOf("/blog/") > -1){
        $(".blog-header .blog-title").next('p').each((i,el)=>{
            let part = $(el).text().split('/');
            let finaldate = part[0].trim() + '/' + part[1].trim() + '/' + part[2].trim().substring(2);
            $(el).text(finaldate);
        });

        if($(".blog-post-wrap").length > 0){

            let txt = $(".blog-post-wrap").find(".blog-date").text();
            let datePart;
            let html;
            let part1;
            let finaldate;
            let flag = false;            
            if(txt.indexOf("by") > -1){
                datePart = txt.split("by");
                part1 = datePart[0].split('/');
                flag = true;
            }else{
                datePart = txt.split("/");
                part1 = datePart;
            }

            finaldate = part1[0].trim() + '/' + part1[1].trim() + '/' + part1[2].trim();

            if(flag){
                html = `<strong>${finaldate}</strong> by <strong>${datePart[1]}</strong>`;
            }else{
                html = `<strong>${finaldate}</strong>`;
            }

            $(".blog-post-wrap").find(".blog-date").html(html);
        }
    }
}

function relatedBlogSlider(){
     $(".custom-blog-list").slick({
        infinite: true,
        dots: false,
        slide: ".blog",
        mobileFirst: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: false,
        arrows: true,
        nextArrow: '.blog-next',
        prevArrow: '.blog-prev',
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1220,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 666,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true,
                    infinite: true
                }
            },
            {
                breakpoint: 567,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true,
                    infinite: true
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true,
                    infinite: true
                }
            }
        ]
    });
}
