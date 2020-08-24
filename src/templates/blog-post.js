import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import "../sass/sections.sass";
import { ChevronDoubleLeft } from "react-bootstrap-icons";
import { Badge } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  author,
  date,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section
      className="section"
      style={{
        zIndex: "-1",
        marginTop: "0 !important",
        background:
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX////+/v4AAAArKyv5+fnz8/MtLS339/fp6en7+/vl5eUkJCQoKCjx8fEWFhYdHR0ODg6srKyfn5/f39+5ublNTU3m5uZeXl7R0dEfHx/V1dW/v790dHTZ2dkZGRmzs7OQkJA+Pj5+fn41NTVoaGiampqKiopDQ0PGxsaMjIxra2tZWVlKSkqlpaWWb1KtAAAgAElEQVR4nLVdCZeyvA6GuKEsgsiIgsqqjOj//3uXsnZJAef9bs6ZER5CmwJN2zRNFaUjtaL2MIA7DXeHG1i0tF4vbkdFIIqXQ08WgorMyX6lIEk0vI9znff5gaYQ3E5jQnD0ARfFU6Mt4OIc4xwSMiGZxZdYK9ml5clqMjfeOEMI4yVT6Z/MxtAK19s3aJ02Cv+w20fHPcHmtIADlp3wtB+2qYgJk3/m87xuS6hv6Ox6Ngd8mRAMQo6W65ItWXe9/k6qL9R+cNeZYwyNF5LsWLQpISNgc+wudJJxTbaLiFaxwEOhbuMKyJ6oaYqgFTkWKaBh91WwT17lROUTdqqajRaLRSNbQ1BF8cEymodbkXXEU3gzVQHPpDv9QIF+hL5NqmDqMsxICiKqkdzHeJufCDQErciNYjgbTRHPv3wKLdcLTksBxSunaZ9QXKuUqVVKlcEI3ckzGyfV/ZQ67KTXr7+pfTaqIuqejOUXPggaJb+BUM4QtogIqmIvbF4pqoqWfIILX2yuMciaBNEmgjzmVZCkAPrrPuQr8qp+YlhGugZEtJp3q2cIGn2iFPi27R2LchB6giOCPhCyn68HrTBZ6XbHLlMsWd+rEnjmF0wNs6QWIdjYi24bAcBQkoP1YC6siFrC6kviYylv3MKJQk8HyJmUJ2tnd36HMFhhvGjzH2SBiDa8B7ohZ7JbGQ59wa/7NKw2Upn7eLSmbQkXhoe9LNelR7iOaVghO+5dDwebpcDb0QWWFL9qbjimeS2fZsdbAe2kUhXkvgYNSGMtoMLxJIoK2ZF3xC4g0o2i96pR4NFrdhUS5l5G0Gpa/NP8C4oU+5Ag/N/TS2wVNgDxffxBB8xd/ywETscM75RL9LtkFKGsFvaGR20t8CDSeF4qiQICBJ3MzpGPQ1ra3gcF9knEV7u9N3cgicvQStiMR+OqkrkhnHyOd0hhKKGkOUHRguincdHuVEfuhDR0RasaxURG0IQaWzaU1VXcPJxTZ4ndQXT3EUEnslPiEhlHcc2wdete4g6aI+Zhnco9gk5oL/V3yaFJ3l4tPHjsmATbn6Z1kjQGMu3hPBU9kInW/b7sth+npjnPQ4at6m8soH2am8Mp+yx5lCOCfsKeYfeAstgK7cLK54aF7eEuz7LoyqPN4ab6RgtbRUUbeK+QNinFL4QtryQrEx7tfncLS9etNT/aYc6a34IebWrw1HBescV/QHI8JlRVooVIyHMrc0w0+uykK07gZH1vi6G9T1Q9V6v6VN71eP9cImlzHaarMaB8/5DnpSl818PhjSfoLpVUK3LRBY1BhYQ3ia68vNfHFFKvrha3WjyJycZvrVKSyzSZgwElF/r4mGgNFXpXBRZHkbdsXkryUkbo53G2zuiVuk05NXXUsTY02tG9tQtZQmUXmbsHvfRibbIJ68nrrQJFKvAWrSVpU/f38BTMDCw7lJvANGjfbIIOOAu7fYfCaEMko+HxZxrcWoL+yzJv/EemGl0D6qSKjO5w/tWUujVAtXPev/93XXU4o8BmUVsWjZRBuxRU+kc51V/Zof1ChXEt89PTtv62a3Sj/7C8ymF46vFdZq/YFkOHRlRj9YNvj1Z2QLF0AgZQqRq9e4WsJYo7euTE3JnuxOv0jTzajHPJkdZZUTsWk6r9l8EcIRGCO++4inWHrNxfVp20HJcSIHN5lM+HnBxC5WqHaLs1UthX3p18Su56GN+dju4GZZjChaCh4ULVizPdIE9igHX2OCK8eArYswtKh9eh7GeMJuR2z1WrO48Ur/lKwoGScCXcK+nn0WRCfLPTMvkUuxncE+RCOt6mXMu6opklo7acpj8u2Mtx4scuCDEatzgE7kqiA3heFjVFK91PiFru6NGTUQm4ionZmBbCWL9e6S2YM6bKodFGy7GZmS8GLpLvgHRa9mKTIEmBgu+wNjcx6Vqx2fnOx1dniebX/bJNlssEbsUQrkrrlgR9gBXM5aXRO8RPyBWcV8VQPomnTrpBdoqlsd3Keq/fom4MGW4VlJjdBvRj3SIhAzaXcSE+EDwgDWt7yM+TqdDLkjUU44d8G4ehH7AdDkVTQ9DV87ZPtSneMSFM6wyv1QZC0qO0Q4pj6dncLIXK3Mmg4af6/fF+UN4M3js2fy4FVHPVaKVkPlVd1EReRAgJ+qrt8ZnlhvAuLXPoK3nwyaFElB1PddsNH0XbP5fYdbHbObudMWslwxRRSpvaLLcTm59LDRW2VclRkNJ22ZMBYA5vxkIm1c7Vh5gb760AE8psE0HFJBC6N0rmDuzEB8pbN49X/mkOCS/OZGawnQGt0XqE+4EnJ55Mvhz4znzLq0E4XRYZ2n7dTO9CIkQl68GFjLs08B7rgkSNFZ1KwakaJCw5nn7SGJ2jI9/BjHHUf0KOfX5NVYDdL1Mcwn6MN/SpgldnTX+rH7qIg/KwKdPeiE4RaJyXf1W19Bb3kMe1kpDQqEqOn1t6CoviPQ4GnYnWYnuoevPenUNlLYsoxBUyh66wkw0Zd228Wf2ptaiL8Hq3JYIibfvOOhXmzzF+bgQ5ZgnhwonUxc8cXkW8NtU1kqGbEB7zeDedbMl7RroU3AnvJuTAcb7qZspo+yPMsuDkp4ANHzB69Bo35a3/cprdsE4kw2vnXxvgpElNaRQj2IGIorxbu2+qg3KOENVbH2mfZ6Mo1X5kuj3Zzai626fZDija4ErwY8157cvTc27aEyQM/4927YR0DhXhK2F4L9DVLD6Fi0+hLbyDnlezl2hjMHw0n/BR6d2EuSgXeARloD758Fx7IBnGVuEqNMebuFyi3VHp0Tc2B8vaOtwYdZ+8KBRvdaiGsLdg8DCT8Y6IhlygTjK99SLbzElREdGClq6/Mcu766ecTY5O4Z6+T09IVuYPU0lmFyvSJM+DPs33rDfnN19FjabGYs0OQgj603XuPvaWzq6Xbqtt1ARSL7WQOVtJdnwx6nHwpNlNu9VGbXQqZQ4dKkU1DNsHKsiUvuqGtsSDzQWw4TWz7UFp6d1udLdOqnH9s3W+0fNuIyMOkcy6Fts/Iu8us87nfcIYOakktN/kdZBnN43+xOeF/qJQ9C02A2/nkV9ZdH4Jk9ql98xPfjUJ736WIooLMRvt4IuhD9MpsqYRh2d24Bq61m0NNzU1VjEk/UUZ6kdJ5HNo/T+w68p1NtnsWL2jMveNojKLjOLpjUO48UR4UTWnfiHELjUen4eR7gTeQztxa18kgs46bI9/Q7qSsUOmo92tWrAdkeG7IZN4qLWDp09t56ZL8mjzXdyEYfr3tq3lGaxQ9Ieuf7cGRSteUJYXE0LBmAch3p37yuHJMG8zq3V2X+uzJ2NHasMqvwG8UH/OyNZ7alwTZlY+HFVZ9AI9ylRz87mv635dO2I0aWWDuCyMKNDtQQfILhyK84ooWj4pSsF50qVbz732lICtk9LVfTFseYn6MQAg4cYS442g6qQAw5zYdwa2v46IumIRyx/zMapBeLP0poS26PO2Sr1is3QT1mQ2+R2p97gq46Qj/kySd7EoahxFa96EdwTaHLO9pVffqiWOr9/t4wgQJ5zRqq8eiWWpn+rntRKaxIROEYRj0Cv0p5hroXkvrZtx5jyTKv3ez9tH/UTNpBWrOwpioAx8tIBoCrLWQsVQZdP3wDvUi9rj6I0nrH2ewPrIVBfKvoe96ly+a/aufzzRDyi8LYLOatuVzxZJuD+6U7Z0tZPwQY7U38blRhVvqnqnOd15J2pxPaj9tpLW/M5QLZHuz2z0suOvDZTDS5qC4r7jiJr8ax+OWdphHtqlyfCOC4GUsCbNTv9lINNRDKF7cZJTo5HYFM1UWIfTy/hb9V4KzGJ1/UQf1EMYS6Up5PCVboCe7b8zzo+z9TsH+1mzrgbezj3xFhHT7mq6hfpGKoVRaqQCTGc32qa1V+79lFL9VQz8WetHrwW7f+mZ7CLnstkcSJMbv4E1r7oWttjIzBpvE581tkkGRONo/fts31UBrFPsSl9rl09Y9V7eSEoSUwGOEgr8qmyX04vh9W0QFvo48GhWp1wYz0Qs4RlCkP+rtPRXm10yLH1o7wjAAjiX0QM40xF98g1aazYWPYLNtmzXZ9zpu+uw/BTVmhSKZ9efqgfDvtlMr61hSkLnSgYIJVBKVsjo39AD6FQl2D6o5tXdIzJL2k48OwoxxWUf1MnOjjsJsES6bwXtvUyiDzJF2301VklNmPzYqMySXpG8fswhB6LqkR4fMaYY/pXCelVYTZucHgBoE6vQ59MMPVxaZaVx4J3aqDfzv40tTna57VAzgUf3GlegftNOjc3MTFmxyONcn/LCrPq++DrhL0vIAts36Uf3ppgXHJp3ugV1hmhTqKLwA2kc1doPKaL9VRjeAdVQtBdDRE2fye7q3ZrK0PSTO94ru04VFRi7http5GhKTNac9mB+Ne+AoAIvCneoH+ukmWQXLJ3YEROeguRVjR5yetiFt8qi7OEH0lxEERrPOVjEvsKu0deI04cZJFhzgR0mYubjZrfuN2/6Xfgz+/FS9yAslu7P3CCY8mDrz5xbNizdrtEcHqcbMx4d+07u4tJ2Kc3/7utWxeHXy3ZcRWx7TyhdFpXSMqeXGVbM2xTOYeDZ9bdLt8xYdjtbWFLUXsN1l4SZJc1bEJGOmLpVSfHJKGZ5AN4oLxXCZB3SFL/YNn6CfpRmowJX7ZttovXjq1kmDv2001UFFkZGVS5drSqgn336ckTU/L6q3jIYXS+a4Y0OXSXIxR79v9LO69zyfQNlKPvuUCisYvuKNDh9flb7WLxSVEU/BaSJuXSDW7THt3FWCDqh3z+kBjanLgifh0qG132YJJ91yUaFGENXTYYfnndlPHd5Cnpy3aZp5wyB9dpNsBLanI0c8ajmpdcerf1KBN7dgBJfDCYFtHGaQtOEF+1Vu935IfmGKduvKhz4EFfD8Q/np8Akz6LVIO9NXd4Cy9sWa0B3562QBJ7wGCpMtd67dmR59H65a92NXUNyNauXzdrrmOQFPVB4tyG0gNqurmN5Vb2PnOGcZH05/tNEs5P0IH7qLvNEC+TGZJ1+Thpa9Uuv2OJ9drrUcVeEvLOcqdZ/NRXAkLeXO3H12rnSRbfEDc9LBsV5OZT4AeltGddXlDlt1NumRNe3/qsH271qbadHTw4cTgDnmEV5ZilaPJt536eP8m7ei49fRKxXuCjEX9FA+ok23HUnKIKNokXGaRBuXj3sUd+D6j2eCglvET7fyRUTUdTsw7lQHBylE8KgT3zfKFntyqS6Y2rsUr8mh5kdpS77nu1kd/rOOaIMJ1p+yjqlNXHjDL1LZ5/roD/SEmHjGp0j6ZvRa895Xr+k2mIsBT5r+hlc9ntdtz3OT9pHm+fpppo92QYl2KHIInQyqsr6gT58CmZK8+8Kgk4mTIQgkdkWi1vI8npn7hZ5CnKU0O4xa83mHf7s8jZFra+KwS1SP/4xw79q5wPAiPvZXAMbika1W2SaWtziJssjQTbOiEPyaLpfaecBzuF+78z8X5VwRnaO1UbY5Pz+qn79E/R8osMynZ2UnRGCGNscIdgOy/tV8hSR4IXrtRA90Hyc96kjLh/YfMq4zNHYHv0hq3ck2oP5deuRZSAxRag4itZ9LLsPGAvjTNz6B/RaDRb0myaK5sPpeA1CEBQb+be6i4FIJYe4SsYZ0EPZOKn6Ox44hqq2WXqo0egVIHR3fYjSgffaDvOvcBQFzqGPbSIZEUlexn+G1rTp/Cbo18m3k9sjKXBmbxSWV4k7o4FPLMdsdglRymymwvsZQb/ty1VS7jh0GZKPPeK8ISTZESoEp5aL3QPlEApRbbkXdAkVmb3qC3SMdVsk6xuHrmwo/RU9CTLl7VZ+WFxxhh78gTfKnHSuhN/7AMxDK9LutauCZzK8FfPBhjX88Og8IWr0MIzjnRfLu7wt2BLyZB4PzlchrWXkHp42gBEesbVDy8feCuWBZyfpODQpj4i9tAKmhLwm3yZQJtm+1Bi0ZVLpn1F06T9i4n7xKLjl0T1vYiUACW3x+KrbaQ5ueHWIUKoeMu9Q7OG/T+TOZTTEweHT5jLFUPe1BrDfB/5ToJIjq7J3IaxZIZCiyISIupeYnHheqh6KKT7KluvAB5pg81FH0R1AdtcEFpr3VC+Ou16kxZpEyyd5gFpmLPknPuhS8f2voHcbWAeMgN80EYrKfpvIZ+w2JmRUCJ6XSpcBq2bdMxpnPoZXVR5V36jxuVy9OLtXMNTfg8Sg8h9RgcZn+I7US+DjyRz21p48kM2Ttws5gzPbsXeca/VweWB04iy/tv83qqBtccVp3iPFrApoPTlFTk2NOZzV71LbGtFMetr9F/6MhPL/wq0l3j2tmA/IqUEfoLKfLOpqnJuQ9cEFh9J0aaclv+7W8ahWL0T+pySq/4Z1fvMFrFRcN0ddtB7DdCd880kBmpEapksD+4ZFcUN5J9Dr07bFCA7z9G5/tjb2O7E9NO12npON0txzBGU1WnvQfZGe40hH9lLZ25TGJCuiOG91lFvgIREO8NEcjhr783PYjqO/oMVpfvyUTQGxwfA1tMDO6OmrlunOzLsKw94YRZlTBnU9u3Gw/aanwwjM1EP6QvHIkjuuhNv3nO8BnkIga200AOSBCWkxkjp9CzwR1YbfjNBKWVZFXP1NZx89oN3+G9Rbqzxzf2xC0M264QljIv6UNkTilS8ErtrD2l0eTX7C7HbJCh7lI9XQWYZJEx6XRSlafV5lIsy7OWc7Fif62hT4ANNYwquwmBxez0aL815cydI9D1hVPcILh1J0hJNzzBdvfpG6ltl2gg1P+FCE8m8Xq6J/Qo9gSFYlVvQkqv8zrBrkU7i3r/+XNvs2TMezvUZi0x9tNGL92Kv6o0pW+wKyEacYhnZBQHoXbmt4zd79aYgP3DOsXtRmQF2jdtpfwyOPcqIp/Mv4N7ObT/tl8m8ZunC7yBMlvEPcW5NbMVBTsOVuOpIRRTIRjEdOPIc6D9VLKW/UTbqeIjyFYVmL4uGz/HSS5ql2e3jkX/XlsJS+owRkoVw08l7U/gjJLB6KdbrjQgzYvR0S5lO+Vf88cOFQp4uRL/Bmjz6JB7anT8UxDCWePq72O95V2XV+66D2X9r+/oU4VUqRT8cOP6NuLPfe28+F8ZHxfdA6d9y/kqGvenwcyn3sOaTmgNLMamqv+wXeCzvtr1EJq+vuJT7xWKbtqXZaD01uwU3Kt7MAbD1kJGlOIs4vE9fDApq8NxLezeXK0IbJruW9Qr0wcvfOkBT6kztjkhhWfrWzMSRwpZnyY2f+iSq355JGhWJtNAxV1CX6vKTEF2Dn2Vno9eYpVDRFewAVz+Gask9U059bM00FfdeI0gvkpkk6hKZFPs1ADJ84pp1xoxmGuvdPsUF42YaiL6Oq7PbcAl3T8J7xZBy2Q6gko6tHkxuk405vERkmrsJZASe/p9VvF8/BFJTSFfj58YbY9T9V2xs+t1gTUQfD2K7L+x5CMTzBcPJbjYQ38WL1/zKwmb9WXcYtsLFXFTP24jf6DqlUtvUgLvO24pdkgv27rDpeH8UM+Z0/WN4Ejt7CFGCc+S+oGdXvke0+KFoaL7UF8pkyaRRx/ZN54rW7HYMRNPMZvmjConkfkG6+6lGN97MQ5lUEmXm+MmhkbEivaVATmssEeWkOkqg5y940eiCdqgyUYA3EtWWqa755n6kFqZjal6BcGTXXFNHuzmUO9LoG7Ons7Vv6oS7Uh2kXLu/U7YJDdJQNobklPmHbqP0+x1rJTZqav9TgjeLlsxNWbFKH2smy9+FGzrCJ+HW93DFxr7K9FXPtB3o5ytNwR1Xx9LBxvbqyca2xwXBJ4vY+qN0YcQMbQaPSEXYhaX/NNdm/9vaczE6G1iVcLPbsqn6Hmllndurxn2DPVf/1Hk7UmG6EiBVdsvQjaaY5baH1nU9pHZXHZjo5Gb1nWx+yvX5GHyHCgaRbj2YmdUQoRBNks66y3UZa7z+lr/wK6uya6IhM1KHNnlpX/eMAlTqaOFqWbwSp0LWwX09dFrUrIT0D9mV2bWilPfXx+V0kF+0YGvvTVAAK1TT/MAnIfZWJdUc//2amerH/hyVE7VbJFjUHEZHkVkESg3e4cOZwoTprydq29Qxd2CnqlB79dBvgtOjRAmrF3pBNM1NttAoLTXdC/yiNo+PwDiu+OCAeFHFENehSA9sdkutqs/tgu6Mh7UJ3lHdBFIbWs6C6SNRtDtz2ljB9wgoxjnJbsqv1rN3zt5AvEaXb9mNn/9s+Q/4ycyeLRvZifxBQK8N4tcPDEbel+sIi2Ebho3abcoOhTzfRuxoMnMr2HIzzUvRrr9f6SeDNdMx7hxeeSRhH2SSaIHwzbB0YPajBdiDfH4y/qw4baQt4DvtMMts1Tbvi+MEbzTrg8wkdJxEab39SSsEsmZlWkben2idysb4JsxvL4wuNVDNHNPNMXK9Q3qo7Uf7V6X5l0Rr+PW+pVthGb7xhSwI23+0+N1AGzsWVLOpi1vPzengcZUvYmKklFaOHX1bbPukZZsXwUkl2Ai8jWhfsCReYgVBFKDO7bddUZ2DbGkpZXj7hrCvgwtAxq1XkLaVCSNDH6Z1a6ZZF8efBy4QWi0HDaLju66IofAGWp9ui7UTVUVTFR8C/8mkh7qDH5esi5RVOpB0H7P27/ZR1OzfI8goJH2Ow9AUbRVXGO1MIE7q4NrNq2NeUG93I8oVudSnQqurqwl5nxgt/puXu6pf4zs4U/aPF62GTHvPSjz1+zXGjHzRtw6Dk/zUvLetsGOve7j2e3UXDUKVZeV9bj/8fq4KGXDwrjs9rwYhOeNU8te11smFRQuYxXNv9hP6Ege3mYahCdkS+B74qFU2CKpNdNR7VLj7vqN1wbUsSetrYs9sidylsL9FdRDGKhg/xS9H6Q1bvqCKHDJUO5WsK943W1N8M7yyzm0r91ltJ+Vn8lWgduhGusYcesmwIbQyQIdPObhq+ql0IuBYJu20ETez7E2x6ECwRWBTtqHPX+A/3hc9Z35FddoUn6fSN+5mPVTNjiEzR6nG20gNnAqAF5sdCfUrXqp6gtw10qd3QCm4V3gFda87Xhrw2k5ES6uLaexXNDhNil1hgWKNGesqlmb55lZDg0PQdWIZeurzHcGZsgg+yEd207mo3tl5XY0HEyjI32nVBAmoH2ErHIbcHlEsR/ezrtajKoYz6S0ie970FqcMV8CVR8GwK2hB6Hhl1zG1zzZxo4jQe4y2DpFK3fU+q/i1SqzHTKWA1FhP0i7mG1t7gbbXO3D3kHu0GCXtZ50XIE/92VZKn8JAorZK6/XrWDt2lzSYJVQl37i0erjCpayXYyaNqlznDSavVeNuWyqPqq24PiZ88zjuzR1z9LQ3+M6V0yorY4S+1VJQQ93W/KsiBX3w4cLUjrRoDsjFpFeJAKvLiKdyfVqUFhTfD8ZpFL5bCHU2jVRKuRX5XTzpipkqmbODcrplpw9ip1w8y0VZVO5dOUiVTn0J3C2+CK9pSFknkcjU8+ZRQN0loP2AOWq9/IdkkNr2PQcWjvUCvS2ja8S6I3nbr78t9KztmJk0lRaamqvgm4it06/+mVd85TUwJ77yED4/Wi5ZdXE64fK8xeN1JHz1+OQ90f0qfbWtDyPD5pOt3ywhXQUhWtnn5FW8W59Orl9o1hOVPTvPNJFGgkd+n3S7Gk2vyXLrJ6XotMONJVKQ5JDLgvnR+Rnix0mC8cdEKsTwywWOx0ZMLyMw9dYtCnENlYQYeyLY5OLlk1aWdBKtxXtedVfBtGzjpmsD7iHpK0xkcoN+6m9fZ3Tm7PzLFuwOidd3f3WQ93MIz4qPZ88yrBOw9ZOyXj4qm6ZUONT+GHbFeNKrwvyZvWHeMqzHGgXTQpeQggx1ZS0NNrzJNBIXSa5vR7KqvKfmpfS2Y5Skor/8kMd9PXJdA9oIUF/MLZ55wMmTKtXFHywD7JXGdn2w7mUew1FvtUXCxPUXRFMeI9VzjUPH7nt3JqFSp4FZY0yW8nfe5YHbGP8Kp7PK+KvRbI0h5f19CGM1/0M7bUhKkyyebsST/WajJtP+UzMkQq7MXO87r7Dde1SLvAxK36iDO3Ft0Ct1QceUs9y8poPSFgU1E1frTDTHj5Vd2sAbdUiWsY/+N8M5MWJEPXGS8WGNwEb/hb7p1gxDv/nOndi6dLxp2QWV/uTP2vhH0Fc3nFdFBiGG7jTDhrv5BNBb466E6/3A6tapdbj+Gg8WbmVaf43dCSM/4QSsmx1doJZy5lfOy8MZLj5pWlGtmJa5KHG+qnuU3r3OCivBdRrQvy7yvH+UNvP1efwmrMWTp3t/7fXzgp/WPUM5ylaMSHtNSK+98KIKk93P5RqMJyGt/1MxdhHTcZbF/tojXQmyg5RtTtiNtytZoDDKm8dvBaDKz0MRrABexKckaNgHbJdUIloE13zeljeDkqqBHZ8g1J+foJsnt++vzvVJ42nkAb+YVaie7otekQyje46va2n4IkIeyniTa7UTQ6NGfGszj6pr2FR5cm8YyO2F3uvm5EVPT4rw2R4QQRBmOr4PJn9qRCO/hTw4dTkOP9UTPNRZtH2Gnr7Gd2+js3MG60KL1fq7r9eLc+WqjQvT3Ow53wY/7w51OcbKDwpkoVULGP9e16mCi2tnOJMO/7sT3gBtWXqCb+umGWG12RxLVY0mNApaXT9Z4FDHSEW/vthsVcPtmiXLQqOYIqPIYpi6MC/3tuPuqiLuzPVhlhS4vOb8bwKyGIujn1k3fDfs5El4VvK2yffaTLdvsBqCfcjGIjd4/hdOskKYdJSDOFF17LOACErh765VKNmnoaQXC9BqJr9O5dXC7lO/Opfk2+jd+gsy51pGD+YcX7M1GDx/5yS18b5tWZ1/Pp0SEw3ZMu2vHkIOCdxd6v7u1pOFQIrGNIfK1njkLm15yUaWwS/dpPzp5sS+foUez1PMgbIYZIbtj9gibqAkAAAVjSURBVOQdliCaTtVTGqiK+RFNslqqn6e82W7YXhLLfTv5Ypy5K2oJw0i1LSDe/N/tfVaCJ8h7AiRudnseGFTkdbrO3ol9+0Tr+zq7n7N1Wjexi3EhyPlW2LiPoEeoJ2ANft3K9q37Vr+r5oOWTlRjlyD4EVHdqCM9o1qzzs4KOLTpJJkcWqW106s6WKubCV2KoXfL0s/WeTCNNXCsa8pO6qNCj0Bk6K5S081klshbvT6VbPKj8kLhbeduUSsZ92bTY2e0PcRQ00mSYSOODk3IR+dSE894n2YEDcj8tU3FQxnyNqExCJPtnvBOBptwAI0Wvd50JLbbPNG49NFbvqQmWPOtRPr+3ZD8Kg08wFE3mtLkexr8I/3FitUu8zinGs976Zu9BHXXmGceU7/gnUbxVytBG3jZLtVZ6PqFa0affdO7Qscj84xm3mczwovBfxw9cez9/x+760sYnJfFnerdOfPcMZnUW8oW+3xyMfbMJLEGqKvOKForSqsr4XoBtBvs0j5Fvz3xQeJV7pdDKTi8uyeIkPc4KppEYOFsxmHe9QfXxg3S65C8HzF0kBjYJs1uZH94N4OH+bVoaB4sMFz4SHeabhWNsYf34UfCw6PSDwITopk6+AnrzTpx21/d0dFmJkxh1AUf7AxfQLFN6+LZz5y1m1Hf/R/RTohPq4e1BMKdKFrH60Io+C5JEm5RBteiRTVkPCCt2s4yzlYcYTMUeMKSlhh/zgQdQm9qD3jtZCkXlg3Pz/ygDWKrFHhktl0YRgSgY8VTvtbk0ibMp9TwKofMxZ+SA8XhDFzXYmzuCSH3UY2OY86Hu/hyE6jv6Uqb4xwQh9/uhxQrIRExCnzXcpFkPb6l44HE/DdtYBtSVLle2Wi3s9mwrD18xzuR9whWeFEyW0xBWg9VjoVG/eKvBjYl7F+/bxho8AFROoUOV/KhxueUEIdbCeClHi7wgG67hbesHsZyH30EAtqdmCm0O6J+oBqnopMDWHZqW7fMcn1FeZPzUsuNbjUXKkRNBdi8BZE6nff+J9AQyEe2zOBtrko4Yd1N7ONurCB3+FUE3iPps75jchYcRwSuK8Vp8fxip9VxciVK2wE4XtdNZK4IFjOVFOnRm+UCswa9AZLrenJB0YV8MSaESvSn0ROCvm9bnPkaw+3WmhkCXRhwFDHmiPAsqjbpgc4yLYMM4MY5josp/JTg/XxqPzTuSufNSkFT+9oSOOCD8Qzcyyzu+3+7iOeqn7Xw5E5OaMtf90+0lwSpoukA+947nLq6S3vTeY8eFiOrd9rzJ7vFO8u7RdGW4hRBq96aENGFPt+aCMrzunH99NhrPh1jpEOPz3ovPA5tTtozh1mgjE9hoOMkUjmRpacH1LFsqlcoiPb4EZj2iyvHpNROxoVnf5YcL5Xkdk3FTJO1kiiHSoLQIRyI/DMsgpKGlkJ2Qmgr8s8nrtKX0uqH3Z12Hr5jMthFTWkz0JiauUOlG0f7p2z+0KsAFZEIdhdWUhDUbZqUSzvsFjNbWezUlCR1CRrBu8zC5DeS+tOqcrSjXaKT2bPDqBODSoz1Yjrq4Dvnvpphdw1TnNVQ8qUJKJXEKOqW75SEC6ir8h8NbAcw8uISJGBdxsxPmxO23F9Vt0NQu3bYzUu9SQDIqop/sYOZa0/KO5XEb1e7zBP4kvqskDjzyCwUYVbpkG9mSfsA93TxIBZbUjadCTTBQgcPwEgKdAzHE7Z5YM2pKi/i6YLaq2jXgnyIKMXyOmd4IaFJ5uufAth9JjghRgxsMdWHM9uVzwpHBGjDQSEqmUS8bY6ucalxt/W0KVsRv2otqMPUG+eVHFZqYNh5uFJcBvfK/wfGGdZSHcbf2gAAAABJRU5ErkJggg=='), rgb(245,245,245)",
      }}
    >
      {helmet || ""}
      <div style={{ backgroundColor: "rgba(205,205,205,0.7)" }}>
        <div className="container pt-3 pb-3">
          <div className="">
            <div
              className="card"
              style={{
                height: "auto",
                margin: "1% 0",
                borderRadius: "20px",
                zIndex: "10",
              }}
            >
              <h1
                className="is-size-2 has-text-weight-bold is-bold-light blog-title"
                style={{
                  fontSize: "3em",
                }}
              >
                {title}
              </h1>
              {date && <p>{date}</p>}
              {author && <p>{author}</p>}

              <p className="blog-description">{description}</p>
              {tags && tags.length ? (
                <div>
                  {/* <h4>Tags: </h4> */}
                  <ul className="taglist" style={{ listStyleType: "none" }}>
                    {tags.map((tag) => (
                      <Badge
                        style={{
                          padding: "5px 10px",
                          margin: "5px",
                          background: "#00c18f",
                        }}
                        key={tag + `tag`}
                      >
                        <Link
                          className="links-tags"
                          to={`/categories/${kebabCase(tag)}/`}
                        >
                          {tag}
                        </Link>
                      </Badge>
                    ))}
                  </ul>
                </div>
              ) : null}
              <PostContent content={content} className="blog-post-content" />

              <div
                className="btn btn-secondary mb-2"
                style={{ width: "120px" }}
              >
                {/* eslint-disable-next-line */}
                <div className="links" onClick={() => window.history.back()}>
                  <ChevronDoubleLeft /> Go Back
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        author
      }
    }
  }
`;
