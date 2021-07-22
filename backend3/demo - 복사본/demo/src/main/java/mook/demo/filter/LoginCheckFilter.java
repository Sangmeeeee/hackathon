package mook.demo.filter;

import lombok.extern.slf4j.Slf4j;
import mook.demo.session.SessionConst;
import org.springframework.util.PatternMatchUtils;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Slf4j
public class LoginCheckFilter implements Filter {

    private static final String[] whitelist = {"/", "/members/add", "/login", "/logout", "/css/*",
            "/api/member/add","/api/login","/api/logout"};

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException{
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String requestURI = httpRequest.getRequestURI();
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        httpResponse.setHeader("Access-Control-Allow-Origin", "http://61.42.104.74:3000"); //허용대상 도메인
        httpResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpResponse.setHeader("Access-Control-Max-Age", "3600");
        httpResponse.setHeader("Access-Control-Allow-Headers", "x-requested-with, origin, content-type, accept");

        try {
            log.info("인증 체크 필터 시작 {}", requestURI);

            if (isLoginCheckPath(requestURI)) {
                log.info("인증 체크 로직 실행 {}", requestURI);
                HttpSession session = httpRequest.getSession(false);
//                if (session == null || session.getAttribute(SessionConst.LOGIN_MEMBER) == null) {
//                    log.info("{}",session);
//                    log.info("{}",session.getAttribute(SessionConst.LOGIN_MEMBER));
//                    log.info("미인증 사용자 요청 {}", requestURI);
//                    //로그인으로 redirect
////                    httpResponse.sendRedirect("/login?redirectURL=" + requestURI);
//                    return;
//                }
            }

//            chain.doFilter(request, response);
            chain.doFilter(request,httpResponse);
        } catch (Exception e){
            throw e;
        } finally{
            log.info("인증 체크 필터 종료 {}", requestURI);
        }
    }

    private boolean isLoginCheckPath(String requestURI){
        return !PatternMatchUtils.simpleMatch(whitelist, requestURI);
    }
}