package mook.demo.service;

import lombok.RequiredArgsConstructor;
import mook.demo.domain.Member;
import mook.demo.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;

    public Member login(String loginId, String password) {
        return memberRepository.findMemberByLoginId(loginId)
                .filter(m -> m.getPassword().equals(password))
                .orElse(null);
    }
}
