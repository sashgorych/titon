function protectmail(user,host)
{
var w=window.open('mailto:'+user+'@'+host);
w.close();
}