/* global kakao */

// 카카오 다큐멘테이션이나 Q&A에 자세한 내용을 직접 찾아볼 수 있지만, 저는 아래의 블로그에서 많은 도움을 받았습니다.
// https://saengmotmi.netlify.app/mentoring/2020-07-03-kakao-map-api-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%A7%88%EC%BB%A4-%EC%B0%8D%EA%B8%B0/
import React, { useState, useEffect } from "react";

function KakaoMap(props) {
  console.log("카카오맵API를 받아옵니다 ***", window.kakao);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => {
      let { kakao } = window;
      let place = props.place;

      kakao.maps.load(() => {
        // <div id="map"> 태그를 찾아 LatLngBounds 객체를 만들어서 초기 지도좌표를 추가합니다
        let mapContainer = document.getElementById("map");
        let mapOptions = {
          center: new kakao.maps.LatLng(33.476947, 126.822903),
          level: 5,
        };
        let map = new kakao.maps.Map(mapContainer, mapOptions);
        // window.localStorage.setItem("current", mapOptions.center);
        // 장소검색 객체를 생성한 후, 키워드를 받아 검색을 실행합니다
        let ps = new kakao.maps.services.Places();
        ps.keywordSearch(place, placesSearchCB);

        // 검색 결과를 기준으로 지도 범위를 재설정한 후, 아래의 마커 생성 콜백함수의 도움으로 마커를 찍습니다
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            let bounds = new kakao.maps.LatLngBounds();

            // for (let i = 0; i < data.length; i++) {
            // 검색결과는 최대 2개까지만 보여주도록 합니다
            for (let i = 0; i < 1; i++) {
              displayMarker(data[i]);
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            map.setBounds(bounds);
            window.localStorage.setItem("current", mapOptions.center);
          }
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
          let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
          });

          // 커스텀 오버레이에 표시할 내용입니다. 스타일을 아래의 HTML Element 태그 안에 직접 입력하면 커스터마이징 할 수 있읍니다
          let content =
            '<div class ="label" style="margin-bottom:7rem;font-size:1rem;background:black;opacity:0.7;color:white;border-radius:6px;border:0.5px solid navy"><span class="left"></span><span class="center" style="padding:5px;">&#11088;' +
            place.place_name +
            '</span><span class="right"></span></div>';

          console.log("검색된 위치입니다 ***", place);

          // 검색된 위치를 바탕으로 커스텀 오버레이를 생성하여 지도에 표시합니다
          let customOverlay = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(place.y, place.x),
            content: content,
          });
          customOverlay.setMap(map);
        }

        // 검색결과가 없다면 검색결과가 없다는 내용을 지도에 출력한 후, 검색실패 결과를 다시 AddPhoto에 끌어올립니다
        if (!placesSearchCB()) {
          let content =
            '<div class ="label" style="margin-bottom:7rem;font-size:1rem;background:black;opacity:0.7;color:white;border-radius:6px;border:0.5px solid navy"><span class="left"></span><span class="center" style="padding:5px;">검색결과가 없습니다 &#128546;</span><span class="right"></span></div>';

          let customOverlay = new kakao.maps.CustomOverlay({
            position: mapOptions.center,
            content: content,
          });
          customOverlay.setMap(map);
          window.localStorage.setItem("current", "");
        }
      });
    };
  }, []);

  return (
    <div
      className="kakaomap"
      id="map"
      style={{
        width: `420px`,
        height: `335px`,
        marginBottom: `1rem`,
      }}
    ></div>
  );
}

export default KakaoMap;
